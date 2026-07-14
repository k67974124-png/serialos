import path from "node:path";

const workspaceNames = [
  "ai",
  "application",
  "config",
  "contracts",
  "db",
  "domain",
  "jobs",
  "observability",
  "storage",
  "testkit",
  "ui",
] as const;

export const workspaceAliases = Object.fromEntries(
  workspaceNames.map((name) => [
    `@serialos/${name}`,
    path.resolve(import.meta.dirname, "packages", name, "src", "index.ts"),
  ]),
);
