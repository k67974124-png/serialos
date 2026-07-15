import { fileURLToPath } from "node:url";

import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { PostgresQueueHealthProbe } from "../src/postgres-health.js";
import { DrizzleSqlMigrationRunner } from "../src/migrations/runner.js";

const adminDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test";
const adminPool = new Pool({ connectionString: adminDatabaseUrl, max: 2 });
const migrationsDirectory = fileURLToPath(new URL("../migrations", import.meta.url));
const migratedDatabaseName = `serialos_health_migrated_${String(process.pid)}`;
const emptyDatabaseName = `serialos_health_${String(process.pid)}`;

function databaseUrlFor(name: string): string {
  const url = new URL(adminDatabaseUrl);
  url.pathname = `/${name}`;
  return url.toString();
}

beforeAll(async () => {
  if (
    !/^serialos_health_[0-9]+$/u.test(emptyDatabaseName) ||
    !/^serialos_health_migrated_[0-9]+$/u.test(migratedDatabaseName)
  ) {
    throw new Error("Refusing to create an unscoped health database");
  }
  await adminPool.query(`DROP DATABASE IF EXISTS "${migratedDatabaseName}"`);
  await adminPool.query(`DROP DATABASE IF EXISTS "${emptyDatabaseName}"`);
  await adminPool.query(`CREATE DATABASE "${migratedDatabaseName}"`);
  await adminPool.query(`CREATE DATABASE "${emptyDatabaseName}"`);
  const runner = new DrizzleSqlMigrationRunner(databaseUrlFor(migratedDatabaseName), {
    migrationsDirectory,
  });
  try {
    await runner.migrate();
  } finally {
    await runner.close();
  }
});

afterAll(async () => {
  await adminPool.query(
    "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = ANY($1::text[]) AND pid <> pg_backend_pid()",
    [[emptyDatabaseName, migratedDatabaseName]],
  );
  await adminPool.query(`DROP DATABASE IF EXISTS "${emptyDatabaseName}"`);
  await adminPool.query(`DROP DATABASE IF EXISTS "${migratedDatabaseName}"`);
  await adminPool.end();
});

describe("PostgreSQL queue readiness", () => {
  it("passes only when the migrated queue claim path is available", async () => {
    const migrated = new PostgresQueueHealthProbe(databaseUrlFor(migratedDatabaseName));
    const empty = new PostgresQueueHealthProbe(databaseUrlFor(emptyDatabaseName));
    try {
      await expect(migrated.check()).resolves.toBeUndefined();
      await expect(empty.check()).rejects.toThrow(/jobs/u);
    } finally {
      await migrated.close();
      await empty.close();
    }
  });
});
