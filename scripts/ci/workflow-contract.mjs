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

function findStepContaining(workflow, marker) {
  const lines = workflow.split(/\r?\n/u);
  const markerIndex = lines.findIndex((line) => line.includes(marker));
  if (markerIndex < 0) {
    throw new Error(`CI workflow is missing required step content: ${marker}`);
  }

  let startIndex = markerIndex;
  while (startIndex >= 0 && !/^\s{6}-\s+/u.test(lines[startIndex] ?? "")) {
    startIndex -= 1;
  }
  if (startIndex < 0) {
    throw new Error(`CI workflow has an invalid step containing: ${marker}`);
  }

  let endIndex = markerIndex + 1;
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

  if (workflow.includes("pnpm/action-setup@")) {
    throw new Error("CI must not use the pnpm/action-setup self-installer");
  }

  const setupNodeStep = findActionStep(workflow, "actions/setup-node");
  const installPnpmStep = findStepContaining(workflow, "npm install --global pnpm@11.12.0");
  const resolveStoreStep = findStepContaining(workflow, "pnpm store path --silent");
  const cacheStep = findActionStep(workflow, "actions/cache");
  if (setupNodeStep.startIndex >= installPnpmStep.startIndex) {
    throw new Error("CI must install the pinned Node.js runtime before installing pnpm");
  }
  if (installPnpmStep.startIndex >= resolveStoreStep.startIndex) {
    throw new Error("CI must install pnpm before resolving its store path");
  }
  if (resolveStoreStep.startIndex >= cacheStep.startIndex) {
    throw new Error("CI must resolve the pnpm store path before restoring its cache");
  }
  if (
    !resolveStoreStep.text.includes("id: pnpm-cache") ||
    !resolveStoreStep.text.includes('>> "$GITHUB_OUTPUT"')
  ) {
    throw new Error("CI must expose the resolved pnpm store path as a step output");
  }
  if (
    !cacheStep.text.includes("actions/cache@27d5ce7f107fe9357f9df03efb73ab90386fccae") ||
    !cacheStep.text.includes("path: ${{ steps.pnpm-cache.outputs.store_path }}") ||
    !cacheStep.text.includes("hashFiles('pnpm-lock.yaml')") ||
    !cacheStep.text.includes("11.12.0")
  ) {
    throw new Error("CI must cache the pnpm store with the pinned cache action and lockfile key");
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
