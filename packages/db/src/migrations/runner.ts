import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate as runDrizzleMigrations } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

interface JournalEntry {
  readonly file: string;
  readonly id: number;
  readonly name: string;
  readonly sha256: string;
}

interface MigrationJournal {
  readonly dialect: "postgresql";
  readonly entries: readonly JournalEntry[];
  readonly version: 1;
}

interface VerifiedMigration extends JournalEntry {
  readonly source: string;
}

export interface MigrationRunnerOptions {
  readonly migrationsDirectory: string;
}

export class MigrationIntegrityError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "MigrationIntegrityError";
  }
}

function assertJournal(value: unknown): asserts value is MigrationJournal {
  if (typeof value !== "object" || value === null) {
    throw new MigrationIntegrityError("Migration journal must be an object");
  }

  const journal = value as Partial<MigrationJournal>;
  if (journal.version !== 1 || journal.dialect !== "postgresql" || !Array.isArray(journal.entries)) {
    throw new MigrationIntegrityError("Migration journal metadata is invalid");
  }

  let previousId = 0;
  for (const unknownEntry of journal.entries as readonly unknown[]) {
    if (typeof unknownEntry !== "object" || unknownEntry === null) {
      throw new MigrationIntegrityError("Migration journal contains an invalid entry");
    }
    const entry = unknownEntry as Record<string, unknown>;
    const { file, id, name, sha256 } = entry;
    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      id <= previousId ||
      typeof name !== "string" ||
      !/^\d{4}_[a-z0-9_]+$/u.test(name) ||
      typeof file !== "string" ||
      file !== `${name}.sql` ||
      typeof sha256 !== "string" ||
      !/^[a-f0-9]{64}$/u.test(sha256)
    ) {
      throw new MigrationIntegrityError("Migration journal contains an invalid or unordered entry");
    }
    previousId = id;
  }
}

async function readVerifiedMigrations(directory: string): Promise<readonly VerifiedMigration[]> {
  const journalPath = path.join(directory, "meta", "journal.json");
  const journalValue: unknown = JSON.parse(await readFile(journalPath, "utf8"));
  assertJournal(journalValue);

  const migrations = await Promise.all(
    journalValue.entries.map(async (entry) => {
      const source = await readFile(path.join(directory, entry.file), "utf8");
      const checksum = createHash("sha256").update(source).digest("hex");
      if (checksum !== entry.sha256) {
        throw new MigrationIntegrityError(`Checksum mismatch for ${entry.file}`);
      }
      return { ...entry, source };
    }),
  );

  const drizzleJournalValue: unknown = JSON.parse(
    await readFile(path.join(directory, "meta", "_journal.json"), "utf8"),
  );
  if (typeof drizzleJournalValue !== "object" || drizzleJournalValue === null) {
    throw new MigrationIntegrityError("Drizzle migration journal must be an object");
  }
  const drizzleEntries = (drizzleJournalValue as Record<string, unknown>).entries;
  if (!Array.isArray(drizzleEntries) || drizzleEntries.length !== migrations.length) {
    throw new MigrationIntegrityError("Drizzle migration journal does not match the checksum journal");
  }
  for (const [index, unknownEntry] of (drizzleEntries as readonly unknown[]).entries()) {
    if (typeof unknownEntry !== "object" || unknownEntry === null) {
      throw new MigrationIntegrityError("Drizzle migration journal contains an invalid entry");
    }
    const entry = unknownEntry as Record<string, unknown>;
    const expected = migrations[index];
    if (
      expected === undefined ||
      entry.idx !== index ||
      entry.when !== expected.id ||
      entry.tag !== expected.name ||
      entry.breakpoints !== true
    ) {
      throw new MigrationIntegrityError("Drizzle migration journal does not match the checksum journal");
    }
  }
  return migrations;
}

export class DrizzleSqlMigrationRunner {
  readonly #options: MigrationRunnerOptions;
  readonly #pool: Pool;

  public constructor(connectionString: string, options: MigrationRunnerOptions) {
    this.#options = options;
    this.#pool = new Pool({ connectionString, connectionTimeoutMillis: 5_000, max: 2 });
  }

  public async migrate(): Promise<readonly string[]> {
    const migrations = await readVerifiedMigrations(this.#options.migrationsDirectory);
    const database = drizzle(this.#pool);

    const metadata = await this.#pool.query<{ present: string | null }>(
      "SELECT to_regclass('serialos_internal.schema_migrations')::text AS present",
    );
    const applied =
      metadata.rows[0]?.present === null
        ? []
        : (
            await this.#pool.query<{ created_at: string; hash: string }>(
              "SELECT created_at::text, hash FROM serialos_internal.schema_migrations ORDER BY created_at",
            )
          ).rows;

    for (const [index, record] of applied.entries()) {
      const expected = migrations[index];
      if (
        expected === undefined ||
        Number(record.created_at) !== expected.id ||
        record.hash !== expected.sha256
      ) {
        throw new MigrationIntegrityError("Applied migration history does not match the immutable journal");
      }
    }

    const pending = migrations.slice(applied.length);
    await runDrizzleMigrations(database, {
      migrationsFolder: this.#options.migrationsDirectory,
      migrationsSchema: "serialos_internal",
      migrationsTable: "schema_migrations",
    });
    return pending.map((migration) => migration.name);
  }

  public async close(): Promise<void> {
    await this.#pool.end();
  }
}
