import { fileURLToPath } from "node:url";

import { PostgresTransactionManager, DrizzleSqlMigrationRunner } from "@serialos/db";
import { asRequestId, asWorkspaceId } from "@serialos/domain";
import { PostgresJobQueue, TransactionalOutbox } from "@serialos/jobs";
import { StructuredLogger } from "@serialos/observability";
import { MutableClock, SequenceIdGenerator } from "@serialos/testkit";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createPostgresWorkerRuntime } from "../src/durable-worker.js";

const migrationsDirectory = fileURLToPath(
  new URL("../../../packages/db/migrations", import.meta.url),
);
const adminDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test";
const adminPool = new Pool({ connectionString: adminDatabaseUrl, max: 2 });
const workspaceId = asWorkspaceId("20000000-0000-4000-8000-000000000081");
const databaseName = `serialos_worker_${String(process.pid)}`;

function databaseUrlFor(name: string): string {
  const url = new URL(adminDatabaseUrl);
  url.pathname = `/${name}`;
  return url.toString();
}

async function waitForTerminalJobs(pool: Pool): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const statuses = await pool.query<{ count: string }>(`
      SELECT count(*)::text AS count
      FROM jobs
      WHERE status IN ('succeeded', 'dead_letter')
    `);
    if (statuses.rows[0]?.count === "2") {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Durable Worker did not reach terminal job states");
}

beforeAll(async () => {
  if (!/^serialos_worker_[0-9]+$/u.test(databaseName)) {
    throw new Error("Refusing to create an unscoped Worker database");
  }
  await adminPool.query(`DROP DATABASE IF EXISTS "${databaseName}"`);
  await adminPool.query(`CREATE DATABASE "${databaseName}"`);
});

afterAll(async () => {
  await adminPool.query(
    "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()",
    [databaseName],
  );
  await adminPool.query(`DROP DATABASE IF EXISTS "${databaseName}"`);
  await adminPool.end();
});

describe("production durable Worker composition", () => {
  it("dispatches outbox work, claims jobs, preserves correlation and rejects unknown types", async () => {
    const databaseUrl = databaseUrlFor(databaseName);
    const runner = new DrizzleSqlMigrationRunner(databaseUrl, { migrationsDirectory });
    await runner.migrate();
    await runner.close();

    const pool = new Pool({ connectionString: databaseUrl, max: 8 });
    const transactions = new PostgresTransactionManager(pool);
    const clock = new MutableClock(new Date("2026-07-14T00:00:00.000Z"));
    const queue = new PostgresJobQueue(
      transactions,
      clock,
      new SequenceIdGenerator(["90000000-0000-4000-8000-000000000081"]),
    );
    const outbox = new TransactionalOutbox(
      clock,
      new SequenceIdGenerator(["94000000-0000-4000-8000-000000000081"]),
    );
    const supportedRequestId = asRequestId("30000000-0000-4000-8000-000000000081");
    const unknownRequestId = asRequestId("30000000-0000-4000-8000-000000000082");
    const lines: string[] = [];
    const logger = new StructuredLogger(
      { write: (line) => lines.push(line) },
      { now: () => clock.now() },
    );
    let observedCorrelation: Readonly<{ requestId: string; traceId: string }> | undefined;
    const runtime = createPostgresWorkerRuntime({
      concurrency: 2,
      databaseUrl,
      handlers: new Map([
        [
          "foundation.verify",
          (lease) => {
            observedCorrelation = { requestId: lease.requestId, traceId: lease.traceId };
            return Promise.resolve();
          },
        ],
      ]),
      leaseDurationMs: 30_000,
      logger,
      pollIntervalMs: 20,
      workerId: "worker-integration",
    });
    let stopped = false;
    try {
      await pool.query(
        "INSERT INTO workspaces (id, name, slug) VALUES ($1, 'Worker 验证工作区', 'worker-verification')",
        [workspaceId],
      );
      await transactions.inTransaction((transaction) =>
        outbox.append(transaction, {
          aggregateId: "71000000-0000-4000-8000-000000000081",
          aggregateType: "foundation",
          aggregateVersion: 1,
          eventType: "foundation.verify",
          payload: { foundationId: "71000000-0000-4000-8000-000000000081" },
          requestId: supportedRequestId,
          traceId: "trace-worker-supported",
          workspaceId,
        }),
      );
      await queue.enqueue({
        maxAttempts: 3,
        payload: { foundationId: "71000000-0000-4000-8000-000000000082" },
        requestId: unknownRequestId,
        traceId: "trace-worker-unknown",
        type: "foundation.unknown",
        workspaceId,
      });

      runtime.start();
      await waitForTerminalJobs(pool);
      expect(await runtime.shutdown(2_000)).toBe(true);
      stopped = true;

      const jobs = await pool.query<{
        request_id: string;
        status: string;
        trace_id: string;
        type: string;
      }>("SELECT type, status, request_id, trace_id FROM jobs ORDER BY type");
      expect(jobs.rows).toEqual([
        {
          request_id: unknownRequestId,
          status: "dead_letter",
          trace_id: "trace-worker-unknown",
          type: "foundation.unknown",
        },
        {
          request_id: supportedRequestId,
          status: "succeeded",
          trace_id: "trace-worker-supported",
          type: "foundation.verify",
        },
      ]);
      expect(observedCorrelation).toEqual({
        requestId: supportedRequestId,
        traceId: "trace-worker-supported",
      });
      const serializedLogs = lines.join("\n");
      expect(serializedLogs).toContain(supportedRequestId);
      expect(serializedLogs).toContain(unknownRequestId);
      expect(serializedLogs).toContain("trace-worker-supported");
      expect(serializedLogs).toContain("trace-worker-unknown");
      expect(serializedLogs).toContain("JOB_TYPE_UNSUPPORTED");
      expect(serializedLogs).not.toContain("foundationId");
      const outboxState = await pool.query<{ published: string }>(
        "SELECT count(*) FILTER (WHERE published_at IS NOT NULL)::text AS published FROM outbox_events",
      );
      expect(outboxState.rows[0]?.published).toBe("1");
    } finally {
      if (!stopped) {
        await runtime.shutdown(2_000);
      }
      await runtime.close();
      await pool.end();
    }
  });
});
