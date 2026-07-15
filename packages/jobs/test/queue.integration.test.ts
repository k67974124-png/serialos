import { fileURLToPath } from "node:url";

import { DrizzleSqlMigrationRunner, PostgresTransactionManager } from "@serialos/db";
import { asRequestId, asWorkspaceId } from "@serialos/domain";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { MutableClock, SequenceIdGenerator } from "../../testkit/src/index.js";
import { isCheckpointStepComplete, type EnqueueJobInput, type JobCheckpoint } from "../src/job.js";
import { PostgresIdempotencyExecutor } from "../src/idempotency.js";
import { PostgresOutboxDispatcher, TransactionalOutbox } from "../src/outbox.js";
import { PostgresJobQueue } from "../src/postgres-job-queue.js";
import { UnsafeJobDataError } from "../src/validation.js";
import { GracefulWorkerRuntime } from "../src/worker-runtime.js";

const migrationsDirectory = fileURLToPath(new URL("../../db/migrations", import.meta.url));
const adminDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test";
const adminPool = new Pool({ connectionString: adminDatabaseUrl, max: 2 });
const workspaceId = asWorkspaceId("20000000-0000-4000-8000-000000000001");
const requestId = asRequestId("30000000-0000-4000-8000-000000000001");
const traceId = "trace-e00-jobs";
let databaseSequence = 0;

interface QueueFixture {
  readonly clock: MutableClock;
  readonly pool: Pool;
  readonly queue: PostgresJobQueue;
  readonly transactions: PostgresTransactionManager;
}

function databaseUrlFor(name: string): string {
  const url = new URL(adminDatabaseUrl);
  url.pathname = `/${name}`;
  return url.toString();
}

async function dropFixtureDatabase(name: string, pool: Pool | undefined): Promise<void> {
  try {
    await pool?.end();
  } finally {
    await adminPool.query(
      "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()",
      [name],
    );
    await adminPool.query(`DROP DATABASE IF EXISTS "${name}"`);
  }
}

async function createFixture(
  ids: readonly string[],
): Promise<QueueFixture & { readonly cleanup: () => Promise<void> }> {
  databaseSequence += 1;
  const name = `serialos_jobs_${String(process.pid)}_${String(databaseSequence)}`;
  if (!/^serialos_jobs_[0-9]+_[0-9]+$/u.test(name)) {
    throw new Error("Refusing to create an unscoped jobs database");
  }
  await adminPool.query(`CREATE DATABASE "${name}"`);
  const connectionString = databaseUrlFor(name);
  let pool: Pool | undefined;
  try {
    const runner = new DrizzleSqlMigrationRunner(connectionString, { migrationsDirectory });
    try {
      await runner.migrate();
    } finally {
      await runner.close();
    }
    pool = new Pool({ connectionString, max: 20 });
    await pool.query(
      "INSERT INTO workspaces (id, name, slug) VALUES ($1, '合成队列工作区', 'synthetic-jobs')",
      [workspaceId],
    );
    const clock = new MutableClock(new Date("2026-07-13T00:00:00.000Z"));
    const transactions = new PostgresTransactionManager(pool);
    const queue = new PostgresJobQueue(transactions, clock, new SequenceIdGenerator(ids));
    return {
      cleanup: () => dropFixtureDatabase(name, pool),
      clock,
      pool,
      queue,
      transactions,
    };
  } catch (error) {
    await dropFixtureDatabase(name, pool);
    throw error;
  }
}

function jobInput(
  dedupeKey: string,
  overrides: { readonly maxAttempts?: number; readonly priority?: number } = {},
): EnqueueJobInput {
  return {
    dedupeKey,
    ...(overrides.maxAttempts === undefined ? {} : { maxAttempts: overrides.maxAttempts }),
    payload: { contentRunId: "71000000-0000-4000-8000-000000000001", contentRunVersion: 1 },
    ...(overrides.priority === undefined ? {} : { priority: overrides.priority }),
    type: "content_run.advance",
    requestId,
    traceId,
    workspaceId,
  };
}

beforeAll(async () => {
  await adminPool.query("SELECT 1");
});

afterAll(async () => {
  await adminPool.end();
});

describe("PostgreSQL durable jobs and outbox", () => {
  it("allows only one competing worker to claim and commit success", async () => {
    const fixture = await createFixture(["90000000-0000-4000-8000-000000000001"]);
    try {
      const job = await fixture.queue.enqueue(jobInput("competing-workers"));
      const claims = await Promise.all([
        fixture.queue.claim("worker-a", 10_000),
        fixture.queue.claim("worker-b", 10_000),
      ]);
      const winner = claims.find((claim) => claim !== undefined);
      expect(winner).toBeDefined();
      expect(claims.filter((claim) => claim !== undefined)).toHaveLength(1);
      if (winner === undefined) {
        throw new Error("Expected one winning lease");
      }
      await expect(
        fixture.queue.succeed({ ...winner, lockedBy: "stale-worker" }),
      ).rejects.toThrow();
      await expect(fixture.queue.succeed(winner)).resolves.toBeUndefined();
      const stored = await fixture.pool.query<{ status: string }>(
        "SELECT status FROM jobs WHERE id = $1",
        [job.id],
      );
      expect(stored.rows[0]?.status).toBe("succeeded");
    } finally {
      await fixture.cleanup();
    }
  });

  it("reclaims an expired lease from checkpoint and replays an idempotent step without a second side effect", async () => {
    const fixture = await createFixture([
      "90000000-0000-4000-8000-000000000002",
      "91000000-0000-4000-8000-000000000001",
    ]);
    try {
      await fixture.queue.enqueue(jobInput("crash-recovery"));
      const firstLease = await fixture.queue.claim("worker-before-crash", 10_000);
      if (firstLease === undefined) {
        throw new Error("Expected initial lease");
      }
      const checkpoint: JobCheckpoint = {
        completedSteps: ["usage.reconcile"],
        providerRequestIds: { "usage.reconcile": "opaque-provider-request-1" },
        resultIds: { "usage.reconcile": "92000000-0000-4000-8000-000000000001" },
      };
      await fixture.queue.saveCheckpoint(firstLease, checkpoint, 0.5, "usage.reconcile");

      const idempotency = new PostgresIdempotencyExecutor(
        fixture.transactions,
        fixture.clock,
        new SequenceIdGenerator(["91000000-0000-4000-8000-000000000001"]),
      );
      const idempotencyInput = {
        key: "usage-reconcile-1",
        operation: "usage.reconcile",
        requestHash: "a".repeat(64),
        workspaceId,
      };
      const firstResult = await idempotency.execute(idempotencyInput, async (transaction) => {
        await transaction.query(
          "INSERT INTO audit_logs (id, workspace_id, action, resource_type) VALUES ($1, $2, 'synthetic.usage', 'job_step')",
          ["93000000-0000-4000-8000-000000000001", workspaceId],
        );
        return { auditId: "93000000-0000-4000-8000-000000000001" };
      });
      expect(firstResult.replayed).toBe(false);

      fixture.clock.advance(10_001);
      const recovered = await fixture.queue.claim("worker-after-crash", 10_000);
      expect(recovered?.attempt).toBe(2);
      expect(recovered?.checkpoint).toEqual(checkpoint);
      if (recovered === undefined) {
        throw new Error("Expected recovered lease");
      }
      expect(isCheckpointStepComplete(recovered.checkpoint, "usage.reconcile")).toBe(true);
      await expect(fixture.queue.heartbeat(firstLease)).rejects.toThrow();
      const replay = await idempotency.execute(idempotencyInput, () =>
        Promise.reject(new Error("Idempotent step must not execute twice")),
      );
      expect(replay).toMatchObject({
        replayed: true,
        result: { auditId: "93000000-0000-4000-8000-000000000001" },
      });
      const effects = await fixture.pool.query<{ count: string }>(
        "SELECT count(*)::text AS count FROM audit_logs WHERE action = 'synthetic.usage'",
      );
      expect(effects.rows[0]?.count).toBe("1");
      await fixture.queue.succeed(recovered, checkpoint);
    } finally {
      await fixture.cleanup();
    }
  });

  it("dead-letters a poison job at max attempts without blocking the next job", async () => {
    const fixture = await createFixture([
      "90000000-0000-4000-8000-000000000003",
      "90000000-0000-4000-8000-000000000004",
    ]);
    try {
      const poison = await fixture.queue.enqueue(
        jobInput("poison", { maxAttempts: 2, priority: 10 }),
      );
      const healthy = await fixture.queue.enqueue(jobInput("healthy", { priority: 0 }));
      const first = await fixture.queue.claim("worker-a", 10_000);
      if (first === undefined) throw new Error("Expected poison lease");
      const scheduled = await fixture.queue.retry(
        first,
        { code: "SYNTHETIC_RETRY", retryable: true },
        { initialDelayMs: 1_000, jitterRatio: 0, maximumDelayMs: 1_000 },
      );
      expect(scheduled.status).toBe("retry_scheduled");
      fixture.clock.advance(1_000);
      const second = await fixture.queue.claim("worker-b", 10_000);
      expect(second?.id).toBe(poison.id);
      if (second === undefined) throw new Error("Expected second poison lease");
      await expect(
        fixture.queue.retry(second, { code: "SYNTHETIC_RETRY", retryable: true }),
      ).resolves.toMatchObject({ status: "dead_letter" });
      const next = await fixture.queue.claim("worker-c", 10_000);
      expect(next?.id).toBe(healthy.id);
      if (next !== undefined) await fixture.queue.succeed(next);
    } finally {
      await fixture.cleanup();
    }
  });

  it("lets cancellation win over a late success result", async () => {
    const fixture = await createFixture([
      "90000000-0000-4000-8000-000000000005",
      "90000000-0000-4000-8000-000000000010",
    ]);
    try {
      const job = await fixture.queue.enqueue(jobInput("cancel-late-result"));
      const lease = await fixture.queue.claim("worker-a", 10_000);
      if (lease === undefined) throw new Error("Expected running lease");
      await expect(fixture.queue.requestCancellation(workspaceId, job.id)).resolves.toBe("running");
      await expect(fixture.queue.succeed(lease)).rejects.toThrow();
      await expect(
        fixture.queue.retry(lease, { code: "CANCELED_AT_BOUNDARY", retryable: true }),
      ).resolves.toMatchObject({ status: "canceled" });
      const stored = await fixture.pool.query<{ status: string }>(
        "SELECT status FROM jobs WHERE id = $1",
        [job.id],
      );
      expect(stored.rows[0]?.status).toBe("canceled");

      const unclaimed = await fixture.queue.enqueue(jobInput("cancel-before-claim"));
      await expect(fixture.queue.requestCancellation(workspaceId, unclaimed.id)).resolves.toBe(
        "canceled",
      );
      await expect(fixture.queue.claim("worker-after-cancel", 10_000)).resolves.toBeUndefined();
    } finally {
      await fixture.cleanup();
    }
  });

  it("commits business state and outbox together, then dispatches one deduplicated durable job", async () => {
    const fixture = await createFixture([]);
    const outbox = new TransactionalOutbox(
      fixture.clock,
      new SequenceIdGenerator([
        "94000000-0000-4000-8000-000000000001",
        "94000000-0000-4000-8000-000000000002",
      ]),
    );
    const eventInput = {
      aggregateId: "71000000-0000-4000-8000-000000000001",
      aggregateType: "content_run",
      aggregateVersion: 2,
      eventType: "content_run.advance",
      payload: { contentRunId: "71000000-0000-4000-8000-000000000001", contentRunVersion: 2 },
      requestId,
      traceId,
      workspaceId,
    };
    try {
      await expect(
        fixture.transactions.inTransaction(async (transaction) => {
          await transaction.query("UPDATE workspaces SET name = '不可提交' WHERE id = $1", [
            workspaceId,
          ]);
          await outbox.append(transaction, eventInput);
          throw new Error("rollback business and outbox");
        }),
      ).rejects.toThrow("rollback business and outbox");
      const afterRollback = await fixture.pool.query<{ count: string; name: string }>(
        "SELECT name, (SELECT count(*) FROM outbox_events)::text AS count FROM workspaces WHERE id = $1",
        [workspaceId],
      );
      expect(afterRollback.rows[0]).toMatchObject({ count: "0", name: "合成队列工作区" });

      await fixture.transactions.inTransaction(async (transaction) => {
        await transaction.query("UPDATE workspaces SET name = '已原子提交' WHERE id = $1", [
          workspaceId,
        ]);
        await outbox.append(transaction, eventInput);
      });
      const dispatcher = new PostgresOutboxDispatcher(
        fixture.transactions,
        fixture.clock,
        new SequenceIdGenerator(["95000000-0000-4000-8000-000000000001"]),
      );
      const dispatched = await dispatcher.dispatchNext();
      expect(dispatched?.jobId).toBe("95000000-0000-4000-8000-000000000001");
      await expect(dispatcher.dispatchNext()).resolves.toBeUndefined();
      const counts = await fixture.pool.query<{ jobs: string; published: string }>(`
        SELECT
          (SELECT count(*) FROM jobs WHERE dedupe_key LIKE 'outbox:%')::text AS jobs,
          (SELECT count(*) FROM outbox_events WHERE published_at IS NOT NULL)::text AS published
      `);
      expect(counts.rows[0]).toEqual({ jobs: "1", published: "1" });
    } finally {
      await fixture.cleanup();
    }
  });

  it("keeps a failed outbox publication durable and does not leak rejected payload content", async () => {
    const fixture = await createFixture([]);
    try {
      const eventId = "94000000-0000-4000-8000-000000000003";
      await fixture.pool.query(
        `
          INSERT INTO outbox_events (
            id, workspace_id, request_id, trace_id, event_type, aggregate_type, aggregate_id,
            aggregate_version, payload, occurred_at
          ) VALUES ($1, $2, $3, $4, 'content_run.advance', 'content_run', $5, 1, $6::jsonb, $7)
        `,
        [
          eventId,
          workspaceId,
          requestId,
          traceId,
          "71000000-0000-4000-8000-000000000001",
          JSON.stringify({ rawText: "synthetic-secret-sentinel" }),
          fixture.clock.now(),
        ],
      );
      const dispatcher = new PostgresOutboxDispatcher(
        fixture.transactions,
        fixture.clock,
        new SequenceIdGenerator(["95000000-0000-4000-8000-000000000002"]),
      );
      let failureMessage = "";
      try {
        await dispatcher.dispatchNext();
      } catch (error) {
        expect(error).toBeInstanceOf(UnsafeJobDataError);
        failureMessage = error instanceof Error ? error.message : String(error);
      }
      expect(failureMessage).not.toContain("synthetic-secret-sentinel");
      const stored = await fixture.pool.query<{ jobs: string; published_at: Date | null }>(
        `
          SELECT published_at, (SELECT count(*) FROM jobs)::text AS jobs
          FROM outbox_events WHERE id = $1
        `,
        [eventId],
      );
      expect(stored.rows[0]).toEqual({ jobs: "0", published_at: null });
    } finally {
      await fixture.cleanup();
    }
  });

  it("returns the same active job for a duplicate dedupe key", async () => {
    const fixture = await createFixture([
      "90000000-0000-4000-8000-000000000006",
      "90000000-0000-4000-8000-000000000007",
    ]);
    try {
      const first = await fixture.queue.enqueue(jobInput("duplicate-submit"));
      const duplicate = await fixture.queue.enqueue(jobInput("duplicate-submit"));
      expect(duplicate.id).toBe(first.id);
      const count = await fixture.pool.query<{ count: string }>(
        "SELECT count(*)::text AS count FROM jobs WHERE dedupe_key = 'duplicate-submit'",
      );
      expect(count.rows[0]?.count).toBe("1");
    } finally {
      await fixture.cleanup();
    }
  });

  it("stops new claims during graceful shutdown and persists a recoverable checkpoint", async () => {
    const fixture = await createFixture([
      "90000000-0000-4000-8000-000000000008",
      "90000000-0000-4000-8000-000000000009",
    ]);
    try {
      const running = await fixture.queue.enqueue(jobInput("graceful-running", { priority: 10 }));
      const queued = await fixture.queue.enqueue(jobInput("graceful-queued"));
      let notifyStarted: (() => void) | undefined;
      const started = new Promise<void>((resolve) => {
        notifyStarted = resolve;
      });
      const runtime = new GracefulWorkerRuntime(
        fixture.queue,
        "worker-shutdown",
        10_000,
        (lease, signal) => {
          notifyStarted?.();
          return new Promise<void>((resolve, reject) => {
            signal.addEventListener(
              "abort",
              () => {
                fixture.queue
                  .saveCheckpoint(
                    lease,
                    {
                      completedSteps: ["safe.boundary"],
                      providerRequestIds: {},
                      resultIds: {},
                    },
                    0.25,
                    "safe.boundary",
                  )
                  .then(resolve, reject);
              },
              { once: true },
            );
          });
        },
      );
      const processing = runtime.processNext();
      await started;
      await expect(runtime.shutdown(1_000)).resolves.toBe(true);
      await expect(processing).resolves.toBe(true);
      expect(runtime.acceptingClaims).toBe(false);
      await expect(runtime.processNext()).resolves.toBe(false);
      const rows = await fixture.pool.query<{
        checkpoint: JobCheckpoint;
        id: string;
        status: string;
      }>("SELECT id, status, checkpoint FROM jobs WHERE id IN ($1, $2) ORDER BY id", [
        running.id,
        queued.id,
      ]);
      expect(rows.rows).toEqual([
        {
          checkpoint: { completedSteps: ["safe.boundary"], providerRequestIds: {}, resultIds: {} },
          id: running.id,
          status: "retry_scheduled",
        },
        {
          checkpoint: { completedSteps: [], providerRequestIds: {}, resultIds: {} },
          id: queued.id,
          status: "queued",
        },
      ]);
    } finally {
      await fixture.cleanup();
    }
  });
});
