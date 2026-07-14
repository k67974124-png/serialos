import { defineConfig } from "vitest/config";

import { workspaceAliases } from "./vitest.aliases.config";

export default defineConfig({
  resolve: { alias: workspaceAliases },
  root: import.meta.dirname,
  test: {
    include: ["packages/contracts/test/**/*.contract.test.ts"],
    pool: "threads",
  },
});
