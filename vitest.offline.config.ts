import { defineConfig } from "vitest/config";

import { workspaceAliases } from "./vitest.aliases.config";

export default defineConfig({
  resolve: { alias: workspaceAliases },
  test: {
    include: ["packages/**/test/**/*.offline.test.ts"],
    pool: "forks",
  },
});
