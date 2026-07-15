import { defineConfig } from "vitest/config";

import { workspaceAliases } from "./vitest.aliases.config";

export default defineConfig({
  resolve: { alias: workspaceAliases },
  test: {
    coverage: {
      enabled: false,
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.git/**",
      "**/*.integration.test.ts",
      "**/*.e2e.test.ts",
      "**/*.offline.test.ts",
      "**/*.contract.test.ts",
    ],
    include: [
      "apps/**/src/**/*.test.ts",
      "packages/**/src/**/*.test.ts",
      "packages/**/test/**/*.test.ts",
      "scripts/**/*.test.mjs",
    ],
    pool: "threads",
  },
});
