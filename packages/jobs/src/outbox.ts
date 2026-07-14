import type { Clock, IdGenerator } from "@serialos/application";
import type { TransactionContext, TransactionManager } from "@serialos/db";
import { asJobId, asWorkspaceId, type WorkspaceId } from "@serialos/domain";

import type { MinimalJobPayload } from "./job.js";
import { emptyCheckpoint } from "./job.js";
import { assertMinimalJobPayload } from "./validation.js";

export interface AppendOutboxEventInput {
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly aggregateVersion: number;
  readonly eventType: string;
  readonly payload: MinimalJobPayload;
  readonly payloadVersion?: number;
  readonly workspaceId: WorkspaceId;
}

export interface DispatchedOutboxEvent {
  readonly eventId: string;
  readonly jobId: string;
  readonly workspaceId: WorkspaceId;
}

function assertEventName(name: string, kind: string): void {
  if (!/^[a-z][a-z0-9_.-]{1,99}$/u.test(name)) {
    throw new RangeError(`${kind} is invalid`);
  }
}

export class TransactionalOutbox {
  readonly #clock: Clock;
  readonly #ids: IdGenerator;

  public constructor(clock: Clock, ids: IdGenerator) {
    this.#clock = clock;
    this.#ids = ids;
  }

  public async append(
    transaction: TransactionContext,
    input: AppendOutboxEventInput,
  ): Promise<string> {
    assertEventName(input.eventType, "Event type");
    assertEventName(input.aggregateType, "Aggregate type");
    assertMinimalJobPayload(input.payload);
    if (!Number.isInteger(input.aggregateVersion) || input.aggregateVersion < 1) {
      throw new RangeError("Aggregate version is invalid");
    }
    const payloadVersion = input.payloadVersion ?? 1;
    if (!Number.isInteger(payloadVersion) || payloadVersion < 1) {
      throw new RangeError("Payload version is invalid");
    }
    const id = this.#ids.generate();
    const rows = await transaction.query<{ id: string }>(
      `
        INSERT INTO outbox_events (
          id, workspace_id, event_type, aggregate_type, aggregate_id, aggregate_version,
          payload_version, payload, occurred_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)
        RETURNING id
      `,
      [
        id,
        input.workspaceId,
        input.eventType,
        input.aggregateType,
        input.aggregateId,
        input.aggregateVersion,
        payloadVersion,
        JSON.stringify(input.payload),
        this.#clock.now(),
      ],
    );
    const row = rows[0];
    if (row === undefined) {
      throw new Error("Outbox insert did not return an identifier");
    }
    return row.id;
  }
}

interface OutboxRow {
  readonly event_type: string;
  readonly id: string;
  readonly payload: unknown;
  readonly workspace_id: string;
}

export class PostgresOutboxDispatcher {
  readonly #clock: Clock;
  readonly #ids: IdGenerator;
  readonly #transactions: TransactionManager;

  public constructor(transactions: TransactionManager, clock: Clock, ids: IdGenerator) {
    this.#transactions = transactions;
    this.#clock = clock;
    this.#ids = ids;
  }

  public async dispatchNext(): Promise<DispatchedOutboxEvent | undefined> {
    return this.#transactions.inTransaction(async (transaction) => {
      const events = await transaction.query<OutboxRow>(`
        SELECT id, workspace_id, event_type, payload
        FROM outbox_events
        WHERE published_at IS NULL
        ORDER BY occurred_at, id
        FOR UPDATE SKIP LOCKED
        LIMIT 1
      `);
      const event = events[0];
      if (event === undefined) {
        return undefined;
      }
      assertEventName(event.event_type, "Event type");
      assertMinimalJobPayload(event.payload);
      const jobId = asJobId(this.#ids.generate());
      const now = this.#clock.now();
      const dedupeKey = `outbox:${event.id}`;
      const inserted = await transaction.query<{ id: string }>(
        `
          INSERT INTO jobs (
            id, workspace_id, type, dedupe_key, payload, status, available_at,
            checkpoint, created_at, updated_at
          )
          VALUES ($1, $2, $3, $4, $5::jsonb, 'queued', $6, $7::jsonb, $6, $6)
          ON CONFLICT DO NOTHING
          RETURNING id
        `,
        [
          jobId,
          event.workspace_id,
          event.event_type,
          dedupeKey,
          JSON.stringify(event.payload),
          now,
          JSON.stringify(emptyCheckpoint()),
        ],
      );
      let durableJobId = inserted[0]?.id;
      if (durableJobId === undefined) {
        const existing = await transaction.query<{ id: string }>(
          "SELECT id FROM jobs WHERE workspace_id = $1 AND type = $2 AND dedupe_key = $3",
          [event.workspace_id, event.event_type, dedupeKey],
        );
        durableJobId = existing[0]?.id;
      }
      if (durableJobId === undefined) {
        throw new Error("Outbox dispatch could not establish a durable job");
      }
      await transaction.query(
        "UPDATE outbox_events SET published_at = $1, attempts = attempts + 1, last_error = NULL WHERE id = $2",
        [now, event.id],
      );
      return {
        eventId: event.id,
        jobId: asJobId(durableJobId),
        workspaceId: asWorkspaceId(event.workspace_id),
      };
    });
  }
}
