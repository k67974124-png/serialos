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

function findActionStep(workflow, actionName) {
  const lines = workflow.split(/\r?\n/u);
  const escapedActionName = actionName.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const usesPattern = new RegExp(
    `^\\s*uses:\\s*${escapedActionName}@[a-f0-9]{40}(?:\\s*#.*)?$`,
    "u",
  );
  const usesIndex = lines.findIndex((line) => usesPattern.test(line));
  if (usesIndex < 0) {
    throw new Error(`CI workflow is missing pinned ${actionName}`);
  }

  let startIndex = usesIndex;
  while (startIndex >= 0 && !/^\s{6}-\s+/u.test(lines[startIndex] ?? "")) {
    startIndex -= 1;
  }
  if (startIndex < 0) {
    throw new Error(`CI workflow has an invalid ${actionName} step`);
  }

  let endIndex = usesIndex + 1;
  while (endIndex < lines.length && !/^\s{6}-\s+/u.test(lines[endIndex] ?? "")) {
    endIndex += 1;
  }

  return {
    startIndex,
    text: lines.slice(startIndex, endIndex).join("\n"),
  };
}

export function validateWorkflow(workflow) {
  const missing = requiredCommands.filter((command) => !workflow.includes(command));
  if (missing.length > 0) {
    throw new Error(`CI workflow is missing required commands: ${missing.join(", ")}`);
  }

  const setupNodeStep = findActionStep(workflow, "actions/setup-node");
  const setupPnpmStep = findActionStep(workflow, "pnpm/action-setup");
  if (setupNodeStep.startIndex >= setupPnpmStep.startIndex) {
    throw new Error("CI must install the pinned Node.js runtime before installing pnpm");
  }
  if (setupPnpmStep.text.includes("standalone: true")) {
    throw new Error("CI must not use the broken @pnpm/exe standalone bootstrap path");
  }
  if (!setupPnpmStep.text.includes("version: 11.12.0")) {
    throw new Error("CI must install the pinned pnpm 11.12.0 version");
  }
  if (
    !setupPnpmStep.text.includes("cache: true") ||
    !setupPnpmStep.text.includes("cache_dependency_path: pnpm-lock.yaml")
  ) {
    throw new Error("CI must let pnpm/action-setup cache dependencies using pnpm-lock.yaml");
  }
  if (
    setupNodeStep.text.includes("cache: pnpm") ||
    setupNodeStep.text.includes("cache-dependency-path: pnpm-lock.yaml")
  ) {
    throw new Error("CI setup-node must not query pnpm before pnpm/action-setup completes");
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

  return {
    actionCount: actionReferences.length,
    gateCount: requiredCommands.length,
  };
}
