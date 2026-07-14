import process from "node:process";

import { DrizzleSqlMigrationRunner, MigrationIntegrityError } from "../src/migrations/runner.js";

const migrationsDirectory = process.argv[2];
if (migrationsDirectory === undefined) {
  throw new Error("A temporary migrations directory is required");
}

const runner = new DrizzleSqlMigrationRunner("postgresql://127.0.0.1:1/unreachable", {
  migrationsDirectory,
});

try {
  await runner.migrate();
  process.stderr.write("NEGATIVE_MIGRATION_UNEXPECTED_PASS\n");
  process.exitCode = 1;
} catch (error) {
  if (!(error instanceof MigrationIntegrityError) || !error.message.includes("Checksum mismatch")) {
    throw error;
  }
  process.stderr.write(`EXPECTED_MIGRATION_REJECTION: ${error.message}\n`);
  process.exitCode = 42;
} finally {
  await runner.close();
}
