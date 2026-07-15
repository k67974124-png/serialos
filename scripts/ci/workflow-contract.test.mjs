import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { validateWorkflow } from "./workflow-contract.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const workflow = await readFile(
  path.join(repositoryRoot, ".github", "workflows", "ci.yml"),
  "utf8",
);

const setupNodeStep = `      - name: Install pinned Node.js
        uses: actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e # v6.4.0
        with:
          node-version-file: .nvmrc`;
const installPnpmStep = `      - name: Install pinned pnpm
        run: npm install --global pnpm@11.12.0`;

describe("CI workflow contract", () => {
  it("accepts the canonical Node-first direct pnpm bootstrap", () => {
    expect(() => validateWorkflow(workflow)).not.toThrow();
  });

  it("rejects the broken pnpm action self-installer", () => {
    const actionSetupWorkflow = workflow.replace(
      installPnpmStep,
      `      - name: Install pinned pnpm
        uses: pnpm/action-setup@0e279bb959325dab635dd2c09392533439d90093
        with:
          standalone: true
          version: 11.12.0`,
    );

    expect(() => validateWorkflow(actionSetupWorkflow)).toThrow(/must not use.*self-installer/u);
  });

  it("rejects installing pnpm before the pinned Node runtime", () => {
    const pnpmFirstWorkflow = workflow.replace(
      `${setupNodeStep}\n\n${installPnpmStep}`,
      `${installPnpmStep}\n\n${setupNodeStep}`,
    );

    expect(pnpmFirstWorkflow).not.toBe(workflow);
    expect(() => validateWorkflow(pnpmFirstWorkflow)).toThrow(
      /Node\.js runtime before installing pnpm/u,
    );
  });

  it("rejects losing the pnpm action lockfile cache", () => {
    const uncachedWorkflow = workflow.replace(
      "          path: ${{ steps.pnpm-cache.outputs.store_path }}\n",
      "",
    );

    expect(() => validateWorkflow(uncachedWorkflow)).toThrow(/cache the pnpm store.*lockfile/u);
  });
});
