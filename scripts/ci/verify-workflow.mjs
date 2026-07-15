import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { validateWorkflow } from "./workflow-contract.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const workflow = await readFile(
  path.join(repositoryRoot, ".github", "workflows", "ci.yml"),
  "utf8",
);
const result = validateWorkflow(workflow);

process.stdout.write(
  `CI workflow valid: ${String(result.gateCount)} gates and ${String(result.actionCount)} pinned actions.\n`,
);
