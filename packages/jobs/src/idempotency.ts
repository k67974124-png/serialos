import type { Clock, IdGenerator } from "@serialos/application";
import type { TransactionContext, TransactionManager } from "@serialos/db";
import type { WorkspaceId } from "@serialos/domain";

import type { MinimalJobPayload } from "./job.js";
import { assertMinimalJobPayload } from "./validation.js";

export class IdempotencyConflictError extends Error {
  public constructor() {
    super("The idempotency key was already used with different input");
    this.name = "IdempotencyConflictError";
  }
}

export interface IdempotentOperationInput {
  readonly key: string;
  readonly operation: string;
  readonly requestHash: string;
  readonly workspaceId: WorkspaceId;
}

export interface IdempotentOperationResult {
  readonly replayed: boolean;
  readonly result: MinimalJobPayload;
}

interface IdempotencyRow {
  readonly request_hash: string;
  readonly response_body: unknown;
}

export class PostgresIdempotencyExecutor {
  readonly #clock: Clock;
  readonly #ids: IdGenerator;
  readonly #transactions: TransactionManager;

  public constructor(transactions: TransactionManager, clock: Clock, ids: IdGenerator) {
    this.#transactions = transactions;
    this.#clock = clock;
    this.#ids = ids;
  }

  public async execute(
    input: IdempotentOperationInput,
    operation: (transaction: TransactionContext) => Promise<MinimalJobPayload>,
  ): Promise<IdempotentOperationResult> {
    if (!/^[a-z][a-z0-9_.-]{1,99}$/u.test(input.operation)) {
      throw new RangeError("Idempotent operation name is invalid");
    }
    if (
      input.key.length === 0 ||
      input.key.length > 200 ||
      !/^[a-f0-9]{64}$/u.test(input.requestHash)
    ) {
      throw new RangeError("Idempotency input is invalid");
    }
    const route = `internal:${input.operation}`;
    return this.#transactions.inTransaction(async (transaction) => {
      const existing = await transaction.query<IdempotencyRow>(
        `
          SELECT request_hash, response_body
          FROM idempotency_keys
          WHERE workspace_id = $1 AND key = $2 AND route = $3
          FOR UPDATE
        `,
        [input.workspaceId, input.key, route],
      );
      const replay = existing[0];
      if (replay !== undefined) {
        if (replay.request_hash !== input.requestHash) {
          throw new IdempotencyConflictError();
        }
        assertMinimalJobPayload(replay.response_body);
        return { replayed: true, result: replay.response_body };
      }

      const now = this.#clock.now();
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1_000);
      const inserted = await transaction.query<{ id: string }>(
        `
          INSERT INTO idempotency_keys (
            id, workspace_id, key, route, request_hash, expires_at, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (workspace_id, key, route) DO NOTHING
          RETURNING id
        `,
        [
          this.#ids.generate(),
          input.workspaceId,
          input.key,
          route,
          input.requestHash,
          expiresAt,
          now,
        ],
      );
      if (inserted.length === 0) {
        const concurrent = await transaction.query<IdempotencyRow>(
          `
            SELECT request_hash, response_body
            FROM idempotency_keys
            WHERE workspace_id = $1 AND key = $2 AND route = $3
            FOR UPDATE
          `,
          [input.workspaceId, input.key, route],
        );
        const concurrentReplay = concurrent[0];
        if (concurrentReplay === undefined || concurrentReplay.request_hash !== input.requestHash) {
          throw new IdempotencyConflictError();
        }
        assertMinimalJobPayload(concurrentReplay.response_body);
        return { replayed: true, result: concurrentReplay.response_body };
      }
      const result = await operation(transaction);
      assertMinimalJobPayload(result);
      await transaction.query(
        `
          UPDATE idempotency_keys
          SET response_status = 200, response_body = $1::jsonb
          WHERE workspace_id = $2 AND key = $3 AND route = $4
        `,
        [JSON.stringify(result), input.workspaceId, input.key, route],
      );
      return { replayed: false, result };
    });
  }
}
