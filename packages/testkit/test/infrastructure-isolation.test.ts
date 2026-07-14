import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

describe("local infrastructure isolation", () => {
  it("uses distinct Compose projects, ports, databases, buckets, and volumes", async () => {
    const [development, test] = await Promise.all([
      readFile(path.join(repositoryRoot, "compose.yaml"), "utf8"),
      readFile(path.join(repositoryRoot, "compose.test.yaml"), "utf8"),
    ]);

    expect(development).toContain("name: serialos-dev");
    expect(development).toContain("POSTGRES_DB: serialos");
    expect(development).toContain("local/serialos-dev");
    expect(test).toContain("name: serialos-test");
    expect(test).toContain("POSTGRES_DB: serialos_test");
    expect(test).toContain("127.0.0.1:55432:5432");
    expect(test).toContain("local/serialos-test");
    expect(test).toContain("postgres-test-data");
    expect(test).not.toContain("127.0.0.1:5432:5432");
  });
});
