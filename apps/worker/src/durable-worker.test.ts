import { EventEmitter } from "node:events";

import { InMemoryMetricsRegistry, StructuredLogger } from "@serialos/observability";
import { describe, expect, it } from "vitest";

import { observeWorkerPoolErrors } from "./durable-worker.js";

describe("durable Worker database failure handling", () => {
  it("handles idle PostgreSQL pool errors without leaking the original error", () => {
    const pool = new EventEmitter();
    const lines: string[] = [];
    const metrics = new InMemoryMetricsRegistry();
    const logger = new StructuredLogger(
      { write: (line) => lines.push(line) },
      { now: () => new Date("2026-07-14T00:00:00.000Z") },
    );

    expect(() => {
      pool.emit("error", new Error("SYNTHETIC_DATABASE_CREDENTIAL_SENTINEL"));
    }).toThrow();

    observeWorkerPoolErrors(pool, logger, metrics);

    expect(() => {
      pool.emit("error", new Error("SYNTHETIC_DATABASE_CREDENTIAL_SENTINEL"));
    }).not.toThrow();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("QUEUE_OPERATION_FAILED");
    expect(lines[0]).not.toContain("SYNTHETIC_DATABASE_CREDENTIAL_SENTINEL");
    expect(metrics.snapshot()).toMatchObject({
      counters: [
        {
          labels: { result: "failed" },
          name: "worker_database_pool_total",
          value: 1,
        },
      ],
    });
  });
});
