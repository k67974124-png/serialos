import { createHash } from "node:crypto";
import { readFile, readdir, rm, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { createClient } from "@hey-api/openapi-ts";
import { compile } from "json-schema-to-typescript";
import { format } from "prettier";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "..", "..");
const checkedOutputRoot = path.join(packageRoot, "src", "generated");
const schemaRoot = path.join(repositoryRoot, "schemas");
const banner = "/* eslint-disable */\n// Generated from canonical SerialOS contracts. Do not edit by hand.";

function assertInsidePackage(target) {
  const relative = path.relative(packageRoot, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Generated contract output must remain inside packages/contracts");
  }
}

function toPascalCase(value) {
  return value
    .split(/[^a-zA-Z0-9]+/u)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

async function filesUnder(root) {
  const output = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      output.push(...(await filesUnder(entryPath)));
    } else {
      output.push(entryPath);
    }
  }
  return output.sort();
}

async function generate(outputRoot) {
  assertInsidePackage(outputRoot);
  await rm(outputRoot, { force: true, recursive: true });
  await mkdir(outputRoot, { recursive: true });

  await createClient({
    input: path.join(repositoryRoot, "contracts", "openapi.yaml"),
    output: {
      clean: true,
      path: path.join(outputRoot, "openapi"),
      tsConfigPath: path.join(packageRoot, "tsconfig.json"),
    },
    plugins: ["@hey-api/typescript"],
  });

  const schemaOutputRoot = path.join(outputRoot, "schemas");
  await mkdir(schemaOutputRoot, { recursive: true });
  const schemaFiles = (await readdir(schemaRoot))
    .filter((name) => name.endsWith(".schema.json"))
    .sort();
  const schemaExports = [];

  for (const schemaFile of schemaFiles) {
    const schema = JSON.parse(await readFile(path.join(schemaRoot, schemaFile), "utf8"));
    const outputName = schemaFile.replace(/\.schema\.json$/u, "");
    const source = await compile(schema, schema.title ?? outputName, {
      bannerComment: banner,
      unreachableDefinitions: true,
    });
    await writeFile(path.join(schemaOutputRoot, `${outputName}.ts`), source, "utf8");
    schemaExports.push(
      `export type * as ${toPascalCase(outputName)}Contract from "./${outputName}.js";`,
    );
  }

  await writeFile(
    path.join(schemaOutputRoot, "index.ts"),
    `${banner}\n${schemaExports.join("\n")}\n`,
    "utf8",
  );
  await writeFile(
    path.join(outputRoot, "index.ts"),
    `${banner}\nexport type * from "./openapi/types.gen.js";\nexport type * from "./schemas/index.js";\n`,
    "utf8",
  );

  for (const generatedFile of await filesUnder(outputRoot)) {
    if (generatedFile.endsWith(".ts")) {
      const source = await readFile(generatedFile, "utf8");
      await writeFile(
        generatedFile,
        await format(source, {
          endOfLine: "lf",
          parser: "typescript",
          printWidth: 100,
          semi: true,
          singleQuote: false,
          trailingComma: "all",
        }),
        "utf8",
      );
    }
  }
}

async function compareGenerated(actualRoot, expectedRoot) {
  const actualFiles = await filesUnder(actualRoot);
  const expectedFiles = await filesUnder(expectedRoot);
  const actualNames = actualFiles.map((file) => path.relative(actualRoot, file).replaceAll("\\", "/"));
  const expectedNames = expectedFiles.map((file) =>
    path.relative(expectedRoot, file).replaceAll("\\", "/"),
  );
  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
    throw new Error("Generated contract file inventory is stale");
  }

  for (const relativeName of actualNames) {
    const [actual, expected] = await Promise.all([
      readFile(path.join(actualRoot, relativeName)),
      readFile(path.join(expectedRoot, relativeName)),
    ]);
    const actualHash = createHash("sha256").update(actual).digest("hex");
    const expectedHash = createHash("sha256").update(expected).digest("hex");
    if (actualHash !== expectedHash) {
      throw new Error(`Generated contract output is stale: ${relativeName}`);
    }
  }
}

const check = process.argv.includes("--check");
if (!check) {
  await generate(checkedOutputRoot);
  process.stdout.write("Generated OpenAPI and nine JSON Schema TypeScript contract sets.\n");
} else {
  const temporaryRoot = path.join(packageRoot, `.generated-check-${String(process.pid)}`);
  assertInsidePackage(temporaryRoot);
  try {
    await generate(temporaryRoot);
    await compareGenerated(temporaryRoot, checkedOutputRoot);
    process.stdout.write("Generated contract output matches canonical sources.\n");
  } finally {
    await rm(temporaryRoot, { force: true, recursive: true });
  }
}
