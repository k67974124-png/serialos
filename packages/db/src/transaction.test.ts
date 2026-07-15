import { EventEmitter } from "node:events";

import type { Pool, PoolClient, QueryResult } from "pg";
import { describe, expect, it, vi } from "vitest";

import { PostgresTransactionManager } from "./transaction.js";

describe("PostgreSQL transaction connection failures", () => {
  it("handles a checked-out client error and destroys the failed connection", async () => {
    const connectionFailure = new Error("SYNTHETIC_DATABASE_CREDENTIAL_SENTINEL");
    const client = new EventEmitter() as EventEmitter & {
      query: ReturnType<typeof vi.fn>;
      release: ReturnType<typeof vi.fn>;
    };
    client.query = vi.fn((statement: string) => {
      if (statement === "BEGIN") {
        return Promise.resolve({ rows: [] } as unknown as QueryResult);
      }
      client.emit("error", connectionFailure);
      return Promise.reject(connectionFailure);
    });
    client.release = vi.fn();
    const pool = {
      connect: () => Promise.resolve(client as unknown as PoolClient),
    } as unknown as Pool;
    const transactions = new PostgresTransactionManager(pool);

    await expect(
      transactions.inTransaction((transaction) => transaction.query("SELECT synthetic_failure")),
    ).rejects.toBe(connectionFailure);
    expect(client.query).toHaveBeenCalledTimes(2);
    expect(client.query).not.toHaveBeenCalledWith("ROLLBACK");
    expect(client.release).toHaveBeenCalledWith(true);
    expect(client.listenerCount("error")).toBe(0);
  });
});
