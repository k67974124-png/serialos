import { defineConfig } from "vitest/config";

import { workspaceAliases } from "./vitest.aliases.config";

export default defineConfig({
  resolve: { alias: workspaceAliases },
  test: {
    include: ["apps/**/test/**/*.integration.test.ts", "packages/**/test/**/*.integration.test.ts"],
    pool: "forks",
    testTimeout: 30_000,
  },
});
