import { readFile } from "node:fs/promises";
import process from "node:process";

import Ajv2020 from "ajv/dist/2020.js";

const fixturePath = process.argv[2];
if (fixturePath === undefined) {
  throw new Error("A temporary schema fixture path is required");
}

const schema = JSON.parse(await readFile(fixturePath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });

try {
  ajv.compile(schema);
  process.stderr.write("NEGATIVE_SCHEMA_UNEXPECTED_PASS\n");
  process.exitCode = 1;
} catch (error) {
  const reason = error instanceof Error ? error.message : "unknown validation failure";
  process.stderr.write(`EXPECTED_SCHEMA_REJECTION: ${reason}\n`);
  process.exitCode = 41;
}
