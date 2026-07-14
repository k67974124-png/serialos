import { spawnSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const pnpmEntrypoint = process.env.npm_execpath;
if (pnpmEntrypoint === undefined || pnpmEntrypoint.length === 0) {
  throw new Error("Run this proof through the pnpm ci:prove-failures script");
}

function execute(args) {
  return spawnSync(process.execPath, [pnpmEntrypoint, ...args], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" },
    shell: false,
    windowsHide: true,
  });
}

function assertExpectedFailure(name, result, expectedMarker) {
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.status === 0 || !output.includes(expectedMarker)) {
    throw new Error(
      `${name} did not fail for the expected reason (exit ${String(result.status)}).\n${output.slice(-2_000)}`,
    );
  }
  process.stdout.write(`${name}: expected failure proved.\n`);
}

const temporaryRoot = await mkdtemp(path.join(tmpdir(), "serialos-negative-gates-"));
try {
  const canonicalSchemaPath = path.join(
    repositoryRoot,
    "schemas",
    "interactive-artifact.schema.json",
  );
  const mutatedSchemaPath = path.join(temporaryRoot, "invalid.schema.json");
  const schema = JSON.parse(await readFile(canonicalSchemaPath, "utf8"));
  schema.type = "serialos-invalid-json-schema-type";
  await writeFile(mutatedSchemaPath, `${JSON.stringify(schema, null, 2)}\n`, "utf8");
  assertExpectedFailure(
    "Schema gate",
    execute([
      "--filter",
      "@serialos/contracts",
      "exec",
      "node",
      "scripts/negative-schema.mjs",
      mutatedSchemaPath,
    ]),
    "EXPECTED_SCHEMA_REJECTION",
  );

  const typeFixturePath = path.join(temporaryRoot, "type-error.ts");
  await writeFile(
    typeFixturePath,
    "const expectedString: string = 42;\nvoid expectedString;\n",
    "utf8",
  );
  assertExpectedFailure(
    "Type gate",
    execute([
      "exec",
      "tsc",
      "--noEmit",
      "--pretty",
      "false",
      "--strict",
      "--skipLibCheck",
      typeFixturePath,
    ]),
    "TS2322",
  );

  const migrationsDirectory = path.join(temporaryRoot, "migrations");
  await cp(path.join(repositoryRoot, "packages", "db", "migrations"), migrationsDirectory, {
    recursive: true,
  });
  const baselinePath = path.join(migrationsDirectory, "0001_baseline.sql");
  await writeFile(
    baselinePath,
    `${await readFile(baselinePath, "utf8")}\n-- intentional temporary checksum mutation\n`,
    "utf8",
  );
  assertExpectedFailure(
    "Migration gate",
    execute([
      "--filter",
      "@serialos/db",
      "exec",
      "tsx",
      "scripts/negative-migration.ts",
      migrationsDirectory,
    ]),
    "EXPECTED_MIGRATION_REJECTION: Checksum mismatch",
  );
} finally {
  await rm(temporaryRoot, { force: true, recursive: true });
}

process.stdout.write("Negative gates passed; all mutations were isolated and removed.\n");
