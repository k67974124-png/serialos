import type { Clock, IdGenerator } from "@serialos/application";
import type { TransactionManager } from "@serialos/db";
import { asJobId, asWorkspaceId, type JobId, type WorkspaceId } from "@serialos/domain";

import { calculateRetryDelayMs, type BackoffOptions } from "./backoff.js";
import {
  JobStateConflictError,
  emptyCheckpoint,
  type EnqueueJobInput,
  type JobCheckpoint,
  type JobLease,
  type JobReference,
  type JobStatus,
  type RetryResult,
  type SafeJobError,
} from "./job.js";
import {
  assertJobCheckpoint,
  assertMinimalJobPayload,
  assertSafeJobError,
  validateJobCorrelation,
} from "./validation.js";

interface JobRow {
  readonly attempt: number;
  readonly checkpoint: unknown;
  readonly current_step: string | null;
  readonly id: string;
  readonly locked_by: string;
  readonly max_attempts: number;
  readonly payload: unknown;
  readonly progress: string;
  readonly request_id: string;
  readonly status: JobStatus;
  readonly trace_id: string;
  readonly type: string;
  readonly workspace_id: string;
}

interface RetryStateRow {
  readonly attempt: number;
  readonly cancel_requested_at: Date | null;
  readonly max_attempts: number;
}

function toLease(row: JobRow): JobLease {
  assertMinimalJobPayload(row.payload);
  assertJobCheckpoint(row.checkpoint);
  const correlation = validateJobCorrelation(row.request_id, row.trace_id);
  return {
    attempt: row.attempt,
    checkpoint: row.checkpoint,
    currentStep: row.current_step,
    id: asJobId(row.id),
    lockedBy: row.locked_by,
    maxAttempts: row.max_attempts,
    payload: row.payload,
    progress: Number(row.progress),
    requestId: correlation.requestId,
    status: row.status,
    traceId: correlation.traceId,
    type: row.type,
    workspaceId: asWorkspaceId(row.workspace_id),
  };
}

function assertJobType(type: string): void {
  if (!/^[a-z][a-z0-9_.-]{1,99}$/u.test(type)) {
    throw new RangeError("Job type is invalid");
  }
}

function assertWorkerId(workerId: string): void {
  if (!/^[a-zA-Z0-9_.:-]{1,100}$/u.test(workerId)) {
    throw new RangeError("Worker ID is invalid");
  }
}

export interface JobQueue {
  claim(workerId: string, leaseDurationMs: number): Promise<JobLease | undefined>;
  enqueue(input: EnqueueJobInput): Promise<JobReference>;
  heartbeat(lease: JobLease): Promise<boolean>;
  isCancellationRequested(lease: JobLease): Promise<boolean>;
  releaseLease(lease: JobLease): Promise<JobStatus>;
  requestCancellation(workspaceId: WorkspaceId, jobId: JobId): Promise<JobStatus | undefined>;
  retry(lease: JobLease, error: SafeJobError, backoff?: BackoffOptions): Promise<RetryResult>;
  saveCheckpoint(
    lease: JobLease,
    checkpoint: JobCheckpoint,
    progress: number,
    currentStep: string,
  ): Promise<void>;
  succeed(lease: JobLease, checkpoint?: JobCheckpoint): Promise<void>;
}

export class PostgresJobQueue implements JobQueue {
  readonly #clock: Clock;
  readonly #ids: IdGenerator;
  readonly #transactions: TransactionManager;

  public constructor(transactions: TransactionManager, clock: Clock, ids: IdGenerator) {
    this.#clock = clock;
    this.#ids = ids;
    this.#transactions = transactions;
  }

  public async enqueue(input: EnqueueJobInput): Promise<JobReference> {
    assertJobType(input.type);
    assertMinimalJobPayload(input.payload);
    const correlation = validateJobCorrelation(input.requestId, input.traceId);
    const id = asJobId(this.#ids.generate());
    const availableAt = input.availableAt ?? this.#clock.now();
    const maxAttempts = input.maxAttempts ?? 5;
    const priority = input.priority ?? 0;
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 100) {
      throw new RangeError("Job maxAttempts is invalid");
    }
    if (!Number.isInteger(priority) || priority < -100 || priority > 100) {
      throw new RangeError("Job priority is invalid");
    }
    if (
      input.dedupeKey !== undefined &&
      (input.dedupeKey.length === 0 || input.dedupeKey.length > 200)
    ) {
      throw new RangeError("Job dedupe key is invalid");
    }

    return this.#transactions.inTransaction(async (transaction) => {
      const inserted = await transaction.query<{
        id: string;
        status: JobStatus;
        workspace_id: string;
      }>(
        `
          INSERT INTO jobs (
            id, workspace_id, request_id, trace_id, type, dedupe_key, payload, status,
            priority, max_attempts, available_at, checkpoint, created_at, updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, 'queued', $8, $9, $10, $11::jsonb, $12, $12)
          ON CONFLICT DO NOTHING
          RETURNING id, workspace_id, status
        `,
        [
          id,
          input.workspaceId,
          correlation.requestId,
          correlation.traceId,
          input.type,
          input.dedupeKey ?? null,
          JSON.stringify(input.payload),
          priority,
          maxAttempts,
          availableAt,
          JSON.stringify(emptyCheckpoint()),
          this.#clock.now(),
        ],
      );
      const row = inserted[0];
      if (row !== undefined) {
        return {
          id: asJobId(row.id),
          status: row.status,
          workspaceId: asWorkspaceId(row.workspace_id),
        };
      }
      if (input.dedupeKey === undefined) {
        throw new JobStateConflictError();
      }
      const existing = await transaction.query<{
        id: string;
        status: JobStatus;
        workspace_id: string;
      }>(
        `
          SELECT id, workspace_id, status
          FROM jobs
          WHERE workspace_id = $1 AND type = $2 AND dedupe_key = $3
            AND status IN ('queued', 'running', 'retry_scheduled')
        `,
        [input.workspaceId, input.type, input.dedupeKey],
      );
      const duplicate = existing[0];
      if (duplicate === undefined) {
        throw new JobStateConflictError();
      }
      return {
        id: asJobId(duplicate.id),
        status: duplicate.status,
        workspaceId: asWorkspaceId(duplicate.workspace_id),
      };
    });
  }

  public async claim(workerId: string, leaseDurationMs: number): Promise<JobLease | undefined> {
    assertWorkerId(workerId);
    if (!Number.isInteger(leaseDurationMs) || leaseDurationMs < 1_000) {
      throw new RangeError("Lease duration must be at least one second");
    }
    const now = this.#clock.now();
    const expiredBefore = new Date(now.getTime() - leaseDurationMs);

    return this.#transactions.inTransaction(async (transaction) => {
      await transaction.query(
        `
          UPDATE jobs
          SET status = 'canceled', completed_at = $1, updated_at = $1,
              locked_at = NULL, locked_by = NULL, heartbeat_at = NULL
          WHERE status = 'running' AND cancel_requested_at IS NOT NULL
            AND COALESCE(heartbeat_at, locked_at) <= $2
        `,
        [now, expiredBefore],
      );
      await transaction.query(
        `
          UPDATE jobs
          SET status = 'dead_letter', dead_lettered_at = $1, completed_at = $1, updated_at = $1,
              locked_at = NULL, locked_by = NULL, heartbeat_at = NULL,
              last_error = '{"code":"LEASE_EXPIRED_MAX_ATTEMPTS","retryable":false}'::jsonb
          WHERE status = 'running' AND cancel_requested_at IS NULL
            AND attempt >= max_attempts AND COALESCE(heartbeat_at, locked_at) <= $2
        `,
        [now, expiredBefore],
      );
      const rows = await transaction.query<JobRow>(
        `
          WITH candidate AS (
            SELECT id
            FROM jobs
            WHERE attempt < max_attempts
              AND cancel_requested_at IS NULL
              AND (
                (status IN ('queued', 'retry_scheduled') AND available_at <= $1)
                OR (status = 'running' AND COALESCE(heartbeat_at, locked_at) <= $2)
              )
            ORDER BY priority DESC, available_at, created_at
            FOR UPDATE SKIP LOCKED
            LIMIT 1
          )
          UPDATE jobs AS job
          SET status = 'running', locked_by = $3, locked_at = $1, heartbeat_at = $1,
              attempt = job.attempt + 1, updated_at = $1
          FROM candidate
          WHERE job.id = candidate.id
          RETURNING job.id, job.workspace_id, job.request_id, job.trace_id, job.type, job.payload,
                    job.status, job.attempt, job.max_attempts, job.locked_by, job.progress::text,
                    job.current_step, job.checkpoint
        `,
        [now, expiredBefore, workerId],
      );
      const row = rows[0];
      return row === undefined ? undefined : toLease(row);
    });
  }

  public async heartbeat(lease: JobLease): Promise<boolean> {
    const rows = await this.#transactions.inTransaction((transaction) =>
      transaction.query<{ cancel_requested_at: Date | null }>(
        `
          UPDATE jobs SET heartbeat_at = $1, updated_at = $1
          WHERE id = $2 AND workspace_id = $3 AND status = 'running' AND locked_by = $4
          RETURNING cancel_requested_at
        `,
        [this.#clock.now(), lease.id, lease.workspaceId, lease.lockedBy],
      ),
    );
    const row = rows[0];
    if (row === undefined) {
      throw new JobStateConflictError();
    }
    return row.cancel_requested_at !== null;
  }

  public async isCancellationRequested(lease: JobLease): Promise<boolean> {
    const rows = await this.#transactions.inTransaction((transaction) =>
      transaction.query<{ cancel_requested_at: Date | null }>(
        `
          SELECT cancel_requested_at FROM jobs
          WHERE id = $1 AND workspace_id = $2 AND status = 'running' AND locked_by = $3
        `,
        [lease.id, lease.workspaceId, lease.lockedBy],
      ),
    );
    const row = rows[0];
    if (row === undefined) {
      throw new JobStateConflictError();
    }
    return row.cancel_requested_at !== null;
  }

  public async saveCheckpoint(
    lease: JobLease,
    checkpoint: JobCheckpoint,
    progress: number,
    currentStep: string,
  ): Promise<void> {
    assertJobCheckpoint(checkpoint);
    if (!Number.isFinite(progress) || progress < 0 || progress > 1) {
      throw new RangeError("Job progress must be between zero and one");
    }
    if (!/^[a-z][a-z0-9_.-]{0,79}$/u.test(currentStep)) {
      throw new RangeError("Current step is invalid");
    }
    const rows = await this.#transactions.inTransaction((transaction) =>
      transaction.query<{ id: string }>(
        `
          UPDATE jobs
          SET checkpoint = $1::jsonb, progress = $2, current_step = $3, heartbeat_at = $4, updated_at = $4
          WHERE id = $5 AND workspace_id = $6 AND status = 'running' AND locked_by = $7
          RETURNING id
        `,
        [
          JSON.stringify(checkpoint),
          progress,
          currentStep,
          this.#clock.now(),
          lease.id,
          lease.workspaceId,
          lease.lockedBy,
        ],
      ),
    );
    if (rows.length !== 1) {
      throw new JobStateConflictError();
    }
  }

  public async succeed(lease: JobLease, checkpoint?: JobCheckpoint): Promise<void> {
    if (checkpoint !== undefined) {
      assertJobCheckpoint(checkpoint);
    }
    const rows = await this.#transactions.inTransaction((transaction) =>
      transaction.query<{ id: string }>(
        `
          UPDATE jobs
          SET status = 'succeeded', progress = 1, checkpoint = COALESCE($1::jsonb, checkpoint),
              completed_at = $2, updated_at = $2, locked_at = NULL, locked_by = NULL, heartbeat_at = NULL
          WHERE id = $3 AND workspace_id = $4 AND status = 'running' AND locked_by = $5
            AND cancel_requested_at IS NULL
          RETURNING id
        `,
        [
          checkpoint === undefined ? null : JSON.stringify(checkpoint),
          this.#clock.now(),
          lease.id,
          lease.workspaceId,
          lease.lockedBy,
        ],
      ),
    );
    if (rows.length !== 1) {
      throw new JobStateConflictError();
    }
  }

  public async retry(
    lease: JobLease,
    error: SafeJobError,
    backoff?: BackoffOptions,
  ): Promise<RetryResult> {
    assertSafeJobError(error);
    return this.#transactions.inTransaction(async (transaction) => {
      const states = await transaction.query<RetryStateRow>(
        `
          SELECT attempt, max_attempts, cancel_requested_at
          FROM jobs
          WHERE id = $1 AND workspace_id = $2 AND status = 'running' AND locked_by = $3
          FOR UPDATE
        `,
        [lease.id, lease.workspaceId, lease.lockedBy],
      );
      const state = states[0];
      if (state === undefined) {
        throw new JobStateConflictError();
      }
      const now = this.#clock.now();
      if (state.cancel_requested_at !== null) {
        await transaction.query(
          `
            UPDATE jobs SET status = 'canceled', completed_at = $1, updated_at = $1,
              locked_at = NULL, locked_by = NULL, heartbeat_at = NULL
            WHERE id = $2 AND workspace_id = $3
          `,
          [now, lease.id, lease.workspaceId],
        );
        return { availableAt: null, status: "canceled" };
      }
      if (!error.retryable || state.attempt >= state.max_attempts) {
        await transaction.query(
          `
            UPDATE jobs SET status = 'dead_letter', dead_lettered_at = $1, completed_at = $1,
              last_error = $2::jsonb, updated_at = $1,
              locked_at = NULL, locked_by = NULL, heartbeat_at = NULL
            WHERE id = $3 AND workspace_id = $4
          `,
          [now, JSON.stringify(error), lease.id, lease.workspaceId],
        );
        return { availableAt: null, status: "dead_letter" };
      }
      const delay = calculateRetryDelayMs(lease.id, state.attempt, backoff);
      const availableAt = new Date(now.getTime() + delay);
      await transaction.query(
        `
          UPDATE jobs SET status = 'retry_scheduled', available_at = $1, last_error = $2::jsonb,
            updated_at = $3, locked_at = NULL, locked_by = NULL, heartbeat_at = NULL
          WHERE id = $4 AND workspace_id = $5
        `,
        [availableAt, JSON.stringify(error), now, lease.id, lease.workspaceId],
      );
      return { availableAt, status: "retry_scheduled" };
    });
  }

  public async requestCancellation(
    workspaceId: WorkspaceId,
    jobId: JobId,
  ): Promise<JobStatus | undefined> {
    const now = this.#clock.now();
    const rows = await this.#transactions.inTransaction((transaction) =>
      transaction.query<{ status: JobStatus }>(
        `
          UPDATE jobs
          SET cancel_requested_at = CASE
                WHEN status IN ('queued', 'running', 'retry_scheduled') THEN $1
                ELSE cancel_requested_at
              END,
              status = CASE
                WHEN status IN ('queued', 'retry_scheduled') THEN 'canceled'::job_status
                ELSE status
              END,
              completed_at = CASE
                WHEN status IN ('queued', 'retry_scheduled') THEN $1
                ELSE completed_at
              END,
              updated_at = CASE
                WHEN status IN ('queued', 'running', 'retry_scheduled') THEN $1
                ELSE updated_at
              END
          WHERE id = $2 AND workspace_id = $3
          RETURNING status
        `,
        [now, jobId, workspaceId],
      ),
    );
    return rows[0]?.status;
  }

  public async releaseLease(lease: JobLease): Promise<JobStatus> {
    const now = this.#clock.now();
    const rows = await this.#transactions.inTransaction((transaction) =>
      transaction.query<{ status: JobStatus }>(
        `
          UPDATE jobs
          SET status = CASE
                WHEN cancel_requested_at IS NULL THEN 'retry_scheduled'::job_status
                ELSE 'canceled'::job_status
              END,
              available_at = CASE WHEN cancel_requested_at IS NULL THEN $1 ELSE available_at END,
              completed_at = CASE WHEN cancel_requested_at IS NULL THEN NULL ELSE $1 END,
              updated_at = $1, locked_at = NULL, locked_by = NULL, heartbeat_at = NULL
          WHERE id = $2 AND workspace_id = $3 AND status = 'running' AND locked_by = $4
          RETURNING status
        `,
        [now, lease.id, lease.workspaceId, lease.lockedBy],
      ),
    );
    const row = rows[0];
    if (row === undefined) {
      throw new JobStateConflictError();
    }
    return row.status;
  }
}
