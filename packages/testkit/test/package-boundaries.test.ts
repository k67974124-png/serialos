import { execFileSync } from "node:child_process";
import path from "node:path";

import { describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(import.meta.dirname, "..", "..", "..");

function runScript(script: string): string {
  return execFileSync(process.execPath, [path.join(repositoryRoot, script)], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
}

describe("foundation command and package boundaries", () => {
  it("has no workspace cycle or forbidden framework dependency", () => {
    expect(runScript("scripts/ci/dependency-check.mjs")).toContain("0 cycles");
  });

  it("maps every required root command to a real check", () => {
    expect(runScript("scripts/ci/verify-command-contract.mjs")).toContain("required scripts");
  });
});
