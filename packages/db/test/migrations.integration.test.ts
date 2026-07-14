import { createHash } from "node:crypto";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { asWorkspaceId } from "@serialos/domain";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createSerialOsDatabase } from "../src/database.js";
import { PostgresAuditWriter } from "../src/audit-writer.js";
import {
  DrizzleSqlMigrationRunner,
  MigrationIntegrityError,
} from "../src/migrations/runner.js";
import { runDevelopmentSeed } from "../src/seed/development-seed.js";
import { PostgresTransactionManager } from "../src/transaction.js";
import { OptimisticConcurrencyError, WorkspaceRepository } from "../src/workspace-repository.js";
import { MissingWorkspaceScopeError, createWorkspaceScope } from "../src/workspace-scope.js";

const migrationsDirectory = fileURLToPath(new URL("../migrations", import.meta.url));
const canonicalSchemaPath = fileURLToPath(new URL("../../../db/schema.sql", import.meta.url));
const adminDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test";

const adminPool = new Pool({ connectionString: adminDatabaseUrl, max: 2 });
let databaseSequence = 0;

function createDatabaseName(): string {
  databaseSequence += 1;
  return `serialos_e00_${String(process.pid)}_${String(databaseSequence)}`;
}

function databaseUrlFor(name: string): string {
  const url = new URL(adminDatabaseUrl);
  url.pathname = `/${name}`;
  return url.toString();
}

async function createDatabase(name: string): Promise<void> {
  if (!/^serialos_e00_[0-9]+_[0-9]+$/u.test(name)) {
    throw new Error("Refusing to create an unscoped integration database");
  }
  await adminPool.query(`CREATE DATABASE "${name}"`);
}

async function dropDatabase(name: string): Promise<void> {
  if (!/^serialos_e00_[0-9]+_[0-9]+$/u.test(name)) {
    throw new Error("Refusing to drop an unscoped integration database");
  }
  await adminPool.query(
    "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()",
    [name],
  );
  await adminPool.query(`DROP DATABASE IF EXISTS "${name}"`);
}

async function migrateDatabase(
  connectionString: string,
  directory = migrationsDirectory,
): Promise<readonly string[]> {
  const runner = new DrizzleSqlMigrationRunner(connectionString, {
    migrationsDirectory: directory,
  });
  try {
    return await runner.migrate();
  } finally {
    await runner.close();
  }
}

async function schemaSignature(pool: Pool): Promise<unknown> {
  const [columns, enums, constraints, indexes, triggers] = await Promise.all([
    pool.query(`
      SELECT table_name, column_name, data_type, udt_name, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name <> 'serialos_schema_migrations'
      ORDER BY table_name, column_name
    `),
    pool.query(`
      SELECT type.typname, enum.enumlabel
      FROM pg_type AS type
      JOIN pg_enum AS enum ON enum.enumtypid = type.oid
      JOIN pg_namespace AS namespace ON namespace.oid = type.typnamespace
      WHERE namespace.nspname = 'public'
      ORDER BY type.typname, enum.enumsortorder
    `),
    pool.query(`
      SELECT relation.relname AS table_name, constraint_record.conname,
             pg_get_constraintdef(constraint_record.oid) AS definition
      FROM pg_constraint AS constraint_record
      JOIN pg_class AS relation ON relation.oid = constraint_record.conrelid
      JOIN pg_namespace AS namespace ON namespace.oid = relation.relnamespace
      WHERE namespace.nspname = 'public' AND relation.relname <> 'serialos_schema_migrations'
      ORDER BY relation.relname, constraint_record.conname
    `),
    pool.query(`
      SELECT tablename, indexname, indexdef
      FROM pg_indexes
      WHERE schemaname = 'public' AND tablename <> 'serialos_schema_migrations'
      ORDER BY tablename, indexname
    `),
    pool.query(`
      SELECT event_object_table, trigger_name, action_timing, event_manipulation
      FROM information_schema.triggers
      WHERE trigger_schema = 'public'
      ORDER BY event_object_table, trigger_name, event_manipulation
    `),
  ]);
  return {
    columns: columns.rows,
    constraints: constraints.rows,
    enums: enums.rows,
    indexes: indexes.rows,
    triggers: triggers.rows,
  };
}

beforeAll(async () => {
  await adminPool.query("SELECT 1");
});

afterAll(async () => {
  await adminPool.end();
});

describe("SQL migration history", () => {
  it("migrates an empty database to a head matching the canonical schema and is a no-op on repeat", async () => {
    const migratedName = createDatabaseName();
    const canonicalName = createDatabaseName();
    await createDatabase(migratedName);
    await createDatabase(canonicalName);
    const migratedUrl = databaseUrlFor(migratedName);
    const canonicalPool = new Pool({ connectionString: databaseUrlFor(canonicalName) });
    const migratedPool = new Pool({ connectionString: migratedUrl });
    try {
      await expect(migrateDatabase(migratedUrl)).resolves.toEqual([
        "0001_baseline",
        "0002_foundation_runtime",
      ]);
      await expect(migrateDatabase(migratedUrl)).resolves.toEqual([]);
      await canonicalPool.query(await readFile(canonicalSchemaPath, "utf8"));
      await expect(schemaSignature(migratedPool)).resolves.toEqual(await schemaSignature(canonicalPool));

      const extensions = await migratedPool.query<{ extname: string }>(
        "SELECT extname FROM pg_extension WHERE extname IN ('pgcrypto', 'vector') ORDER BY extname",
      );
      expect(extensions.rows.map((row) => row.extname)).toEqual(["pgcrypto", "vector"]);
    } finally {
      await migratedPool.end();
      await canonicalPool.end();
      await dropDatabase(migratedName);
      await dropDatabase(canonicalName);
    }
  });

  it("upgrades 0001 data forward to 0002 without loss", async () => {
    const name = createDatabaseName();
    await createDatabase(name);
    const connectionString = databaseUrlFor(name);
    const pool = new Pool({ connectionString });
    try {
      const baselineSource = await readFile(path.join(migrationsDirectory, "0001_baseline.sql"), "utf8");
      const baselineHash = createHash("sha256").update(baselineSource).digest("hex");
      await pool.query(baselineSource);
      await pool.query("CREATE SCHEMA serialos_internal");
      await pool.query(`
        CREATE TABLE serialos_internal.schema_migrations (
          id serial PRIMARY KEY,
          hash text NOT NULL,
          created_at bigint
        )
      `);
      await pool.query(
        "INSERT INTO serialos_internal.schema_migrations (hash, created_at) VALUES ($1, 1)",
        [baselineHash],
      );
      await pool.query(
        "INSERT INTO users (id, email) VALUES ('10000000-0000-4000-8000-000000000099', 'upgrade@example.test')",
      );
      await expect(migrateDatabase(connectionString)).resolves.toEqual(["0002_foundation_runtime"]);
      const preserved = await pool.query<{ count: string }>(
        "SELECT count(*)::text AS count FROM users WHERE id = '10000000-0000-4000-8000-000000000099'",
      );
      const columns = await pool.query<{ column_name: string }>(`
        SELECT column_name FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'jobs'
          AND column_name IN ('progress', 'current_step', 'checkpoint', 'cancel_requested_at', 'dead_lettered_at')
      `);
      expect(preserved.rows[0]?.count).toBe("1");
      expect(columns.rowCount).toBe(5);
    } finally {
      await pool.end();
      await dropDatabase(name);
    }
  });

  it("fails checksum tampering before touching the database", async () => {
    const name = createDatabaseName();
    await createDatabase(name);
    const temporaryRoot = await mkdtemp(path.join(tmpdir(), "serialos-migrations-"));
    const copiedMigrations = path.join(temporaryRoot, "migrations");
    await cp(migrationsDirectory, copiedMigrations, { recursive: true });
    await writeFile(
      path.join(copiedMigrations, "0001_baseline.sql"),
      `${await readFile(path.join(copiedMigrations, "0001_baseline.sql"), "utf8")}\n-- tampered\n`,
      "utf8",
    );
    const connectionString = databaseUrlFor(name);
    const pool = new Pool({ connectionString });
    try {
      await expect(migrateDatabase(connectionString, copiedMigrations)).rejects.toThrow(
        MigrationIntegrityError,
      );
      const metadataTable = await pool.query<{ present: string | null }>(
        "SELECT to_regclass('serialos_internal.schema_migrations')::text AS present",
      );
      expect(metadataTable.rows[0]?.present).toBeNull();
    } finally {
      await pool.end();
      await rm(temporaryRoot, { force: true, recursive: true });
      await dropDatabase(name);
    }
  });
});

describe("seed and data access boundaries", () => {
  it("keeps seed deterministic, isolates workspaces, rolls back transactions and protects audit facts", async () => {
    const name = createDatabaseName();
    await createDatabase(name);
    const connectionString = databaseUrlFor(name);
    await migrateDatabase(connectionString);
    await runDevelopmentSeed(connectionString);
    await runDevelopmentSeed(connectionString);
    const pool = new Pool({ connectionString });
    try {
      const counts = await pool.query<{
        artifacts: string;
        assets: string;
        materials: string;
        users: string;
        workspaces: string;
      }>(`
        SELECT
          (SELECT count(*) FROM users)::text AS users,
          (SELECT count(*) FROM workspaces)::text AS workspaces,
          (SELECT count(*) FROM material_items)::text AS materials,
          (SELECT count(*) FROM insight_assets)::text AS assets,
          (SELECT count(*) FROM artifact_specs)::text AS artifacts
      `);
      expect(counts.rows[0]).toMatchObject({
        artifacts: "3",
        assets: "20",
        materials: "8",
        users: "2",
        workspaces: "2",
      });

      expect(() => createWorkspaceScope(undefined)).toThrow(MissingWorkspaceScopeError);
      const repository = new WorkspaceRepository(createSerialOsDatabase(pool));
      const workspaceA = createWorkspaceScope(asWorkspaceId("20000000-0000-4000-8000-000000000001"));
      const workspaceB = createWorkspaceScope(asWorkspaceId("20000000-0000-4000-8000-000000000002"));
      await expect(
        repository.findMaterialById(workspaceA, "50000000-0000-4000-8000-000000000001"),
      ).resolves.toMatchObject({ title: "合成素材甲-1" });
      await expect(
        repository.findMaterialById(workspaceB, "50000000-0000-4000-8000-000000000001"),
      ).resolves.toBeUndefined();
      await expect(repository.renameWorkspace(workspaceA, 1, "合成工作区甲-更新")).resolves.toBe(2);
      await expect(repository.renameWorkspace(workspaceA, 1, "过期更新")).rejects.toThrow(
        OptimisticConcurrencyError,
      );

      const transactionManager = new PostgresTransactionManager(pool);
      const rollbackId = "80000000-0000-4000-8000-000000000001";
      await expect(
        transactionManager.inTransaction(async (transaction) => {
          await transaction.query(
            "INSERT INTO audit_logs (id, action, resource_type) VALUES ($1, 'synthetic.rollback', 'test')",
            [rollbackId],
          );
          throw new Error("force rollback");
        }),
      ).rejects.toThrow("force rollback");
      const rolledBack = await pool.query<{ count: string }>(
        "SELECT count(*)::text AS count FROM audit_logs WHERE id = $1",
        [rollbackId],
      );
      expect(rolledBack.rows[0]?.count).toBe("0");

      const auditId = "80000000-0000-4000-8000-000000000002";
      const auditWriter = new PostgresAuditWriter(createSerialOsDatabase(pool));
      await auditWriter.append({
        action: "synthetic.insert",
        actorType: "system",
        actorUserId: null,
        afterSummary: { result: "inserted" },
        beforeSummary: null,
        createdAt: new Date("2026-07-13T00:00:00.000Z"),
        id: auditId,
        requestId: "80000000-0000-4000-8000-000000000003",
        resourceId: null,
        resourceType: "test",
        workspaceId: workspaceA.workspaceId,
      });
      const insertedAudit = await pool.query<{ action: string; after_summary: { result: string } }>(
        "SELECT action, after_summary FROM audit_logs WHERE id = $1",
        [auditId],
      );
      expect(insertedAudit.rows[0]).toEqual({
        action: "synthetic.insert",
        after_summary: { result: "inserted" },
      });
      await expect(pool.query("UPDATE audit_logs SET action = 'forbidden' WHERE id = $1", [auditId])).rejects.toMatchObject(
        { code: "55000" },
      );
      await expect(pool.query("DELETE FROM audit_logs WHERE id = $1", [auditId])).rejects.toMatchObject({
        code: "55000",
      });

      const checksum = createHash("sha256")
        .update(await readFile(path.join(migrationsDirectory, "0001_baseline.sql"), "utf8"))
        .digest("hex");
      expect(checksum).toMatch(/^[a-f0-9]{64}$/u);
    } finally {
      await pool.end();
      await dropDatabase(name);
    }
  });
});
