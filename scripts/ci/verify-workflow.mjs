import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const workflow = await readFile(
  path.join(repositoryRoot, ".github", "workflows", "ci.yml"),
  "utf8",
);
const requiredCommands = [
  "pnpm install --frozen-lockfile",
  "pnpm specs:validate",
  "pnpm format:check",
  "pnpm lint",
  "pnpm typecheck",
  "pnpm test",
  "pnpm test:offline",
  "pnpm test:integration",
  "pnpm contracts:check",
  "pnpm build",
  "pnpm test:e2e",
  "pnpm smoke",
  "pnpm ci:prove-failures",
];

const missing = requiredCommands.filter((command) => !workflow.includes(command));
if (missing.length > 0) {
  throw new Error(`CI workflow is missing required commands: ${missing.join(", ")}`);
}
if (
  !workflow.includes("cache: pnpm") ||
  !workflow.includes("cache-dependency-path: pnpm-lock.yaml")
) {
  throw new Error("CI workflow must cache pnpm dependencies using the lockfile");
}
if (!workflow.includes("standalone: true") || !workflow.includes("version: 11.12.0")) {
  throw new Error("CI must bootstrap the pinned pnpm version without relying on runner Node.js");
}
if (!workflow.includes("pnpm infra:test:up") || !workflow.includes("pnpm infra:test:down")) {
  throw new Error("CI workflow must start and stop isolated PostgreSQL/object-storage services");
}

const actionReferences = [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)(?:\s*#.*)?$/gmu)].map(
  (match) => match[1],
);
if (actionReferences.length === 0) {
  throw new Error("CI workflow must declare pinned actions");
}
const unpinned = actionReferences.filter((reference) => !/@[a-f0-9]{40}$/u.test(reference ?? ""));
if (unpinned.length > 0) {
  throw new Error(`CI actions must use full commit SHAs: ${unpinned.join(", ")}`);
}
if (/OPENAI_API_KEY:\s*[^\s#]+/u.test(workflow)) {
  throw new Error("Default CI must not configure an OpenAI API key");
}
if (!workflow.includes('FEATURE_LIVE_PROVIDER_TESTS: "false"')) {
  throw new Error("Default CI must explicitly disable live-provider tests");
}

process.stdout.write(
  `CI workflow valid: ${String(requiredCommands.length)} gates and ${String(actionReferences.length)} pinned actions.\n`,
);
