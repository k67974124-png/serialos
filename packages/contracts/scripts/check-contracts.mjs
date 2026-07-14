import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "..", "..");
const openApiPath = path.join(repositoryRoot, "contracts", "openapi.yaml");
const schemaRoot = path.join(repositoryRoot, "schemas");
const exampleRoot = path.join(repositoryRoot, "examples");

const validated = await SwaggerParser.validate(openApiPath);
const dereferenced = await SwaggerParser.dereference(openApiPath);
if (validated.openapi !== "3.1.0" || dereferenced.openapi !== "3.1.0") {
  throw new Error("Canonical API must parse and dereference as OpenAPI 3.1.0");
}

const schemaFiles = (await readdir(schemaRoot))
  .filter((name) => name.endsWith(".schema.json"))
  .sort();
if (schemaFiles.length !== 9) {
  throw new Error(`Expected nine canonical JSON Schemas, found ${String(schemaFiles.length)}`);
}

const ajv = new Ajv2020({ allErrors: true, allowUnionTypes: true, strict: true });
addFormats(ajv);
for (const schemaFile of schemaFiles) {
  const schema = JSON.parse(await readFile(path.join(schemaRoot, schemaFile), "utf8"));
  const validate = ajv.compile(schema);
  const exampleFile = schemaFile.replace(".schema.json", ".example.json");
  const example = JSON.parse(await readFile(path.join(exampleRoot, exampleFile), "utf8"));
  if (!validate(example)) {
    throw new Error(`Canonical example failed ${schemaFile}: ${ajv.errorsText(validate.errors)}`);
  }
}

const generation = await execFileAsync(
  process.execPath,
  [path.join(packageRoot, "scripts", "generate-contracts.mjs"), "--check"],
  { cwd: repositoryRoot, encoding: "utf8" },
);
process.stdout.write(generation.stdout);
process.stdout.write(
  `OpenAPI parsed/dereferenced (${String(Object.keys(validated.paths ?? {}).length)} paths); nine Draft 2020-12 examples validated.\n`,
);
