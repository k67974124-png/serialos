import { fileURLToPath } from "node:url";

import { DrizzleSqlMigrationRunner } from "./runner.js";

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl === undefined || databaseUrl.length === 0) {
  throw new Error("DATABASE_URL is required");
}

const migrationsDirectory = fileURLToPath(new URL("../../migrations", import.meta.url));
const runner = new DrizzleSqlMigrationRunner(databaseUrl, { migrationsDirectory });

try {
  const applied = await runner.migrate();
  process.stdout.write(applied.length === 0 ? "Database is already at head.\n" : `Applied: ${applied.join(", ")}\n`);
} finally {
  await runner.close();
}
