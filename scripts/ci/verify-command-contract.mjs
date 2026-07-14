import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const requiredScripts = [
  "build",
  "dev",
  "format:check",
  "lint",
  "typecheck",
  "test",
  "test:integration",
  "test:e2e",
  "db:migrate",
  "db:seed",
  "specs:validate",
];
const placeholderPatterns = [
  /^true$/u,
  /^exit\s+0$/u,
  /echo\s+(?:passed|success)/iu,
  /passWithNoTests/iu,
];

const manifest = JSON.parse(await readFile(path.join(repositoryRoot, "package.json"), "utf8"));
const scripts = manifest.scripts ?? {};
const missing = requiredScripts.filter((name) => typeof scripts[name] !== "string");
if (missing.length > 0) {
  throw new Error(`Missing required root scripts: ${missing.join(", ")}`);
}

for (const name of requiredScripts) {
  const command = scripts[name];
  if (placeholderPatterns.some((pattern) => pattern.test(command))) {
    throw new Error(`Root script ${name} is a placeholder: ${command}`);
  }
}

process.stdout.write(
  `Command contract valid: ${requiredScripts.length} required scripts are real commands.\n`,
);
