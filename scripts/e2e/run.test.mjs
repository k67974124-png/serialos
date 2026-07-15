import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

import { afterEach, describe, expect, it } from "vitest";

import {
  prepareStandaloneAssets,
  resolvePnpmEntrypoint,
  runNode,
  startNode,
  stopProcess,
} from "./run.mjs";

const temporaryRoots = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { force: true, recursive: true })),
  );
});

describe("E2E process runner", () => {
  it("requires the pinned package-manager entrypoint", () => {
    expect(() => resolvePnpmEntrypoint({})).toThrow("pnpm test:e2e");
    expect(resolvePnpmEntrypoint({ npm_execpath: "pinned-pnpm.cjs" })).toBe("pinned-pnpm.cjs");
  });

  it("waits for a pnpm-style child command to exit successfully", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "serialos-e2e-runner-"));
    temporaryRoots.push(root);
    const fakePnpm = path.join(root, "fake-pnpm.mjs");
    const resultPath = path.join(root, "args.json");
    await writeFile(
      fakePnpm,
      `import { writeFile } from "node:fs/promises";\nawait writeFile(process.env.RESULT_PATH, JSON.stringify(process.argv.slice(2)));\n`,
      "utf8",
    );

    await expect(
      runNode([fakePnpm, "exec", "playwright", "test"], {
        ...process.env,
        RESULT_PATH: resultPath,
      }),
    ).resolves.toBeUndefined();
    await expect(readFile(resultPath, "utf8")).resolves.toBe(
      JSON.stringify(["exec", "playwright", "test"]),
    );
  });

  it("terminates the directly managed Web process", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "serialos-e2e-server-"));
    temporaryRoots.push(root);
    const server = path.join(root, "server.mjs");
    await writeFile(server, "setInterval(() => undefined, 1_000);\n", "utf8");
    const child = startNode([server], process.env, { cwd: root, stdio: "ignore" });

    await expect(stopProcess(child, 2_000)).resolves.toBeUndefined();
    expect(child.exitCode !== null || child.signalCode !== null).toBe(true);
  });

  it("copies static assets into the standalone Web layout", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "serialos-e2e-assets-"));
    temporaryRoots.push(root);
    const source = path.join(root, "apps", "web", ".next", "static", "styles.css");
    await mkdir(path.dirname(source), { recursive: true });
    await writeFile(source, ".health-link:focus { outline-style: solid; }", "utf8");

    await prepareStandaloneAssets(root);

    const copied = path.join(
      root,
      "apps",
      "web",
      ".next",
      "standalone",
      "apps",
      "web",
      ".next",
      "static",
      "styles.css",
    );
    await expect(readFile(copied, "utf8")).resolves.toContain("outline-style: solid");
  });
});
