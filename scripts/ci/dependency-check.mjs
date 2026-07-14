import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function packageDirectories(parent) {
  const absoluteParent = path.join(repositoryRoot, parent);
  const entries = await readdir(absoluteParent, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(absoluteParent, entry.name));
}

function workspaceDependencies(manifest) {
  const dependencyGroups = [
    manifest.dependencies,
    manifest.devDependencies,
    manifest.optionalDependencies,
  ];
  return dependencyGroups
    .flatMap((group) => Object.entries(group ?? {}))
    .filter(([, version]) => typeof version === "string" && version.startsWith("workspace:"))
    .map(([name]) => name);
}

function findCycle(graph) {
  const complete = new Set();
  const visiting = new Set();
  const stack = [];

  function visit(node) {
    if (visiting.has(node)) {
      return [...stack.slice(stack.indexOf(node)), node];
    }
    if (complete.has(node)) {
      return null;
    }

    visiting.add(node);
    stack.push(node);
    for (const dependency of graph.get(node) ?? []) {
      const cycle = visit(dependency);
      if (cycle !== null) {
        return cycle;
      }
    }
    stack.pop();
    visiting.delete(node);
    complete.add(node);
    return null;
  }

  for (const node of graph.keys()) {
    const cycle = visit(node);
    if (cycle !== null) {
      return cycle;
    }
  }
  return null;
}

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(entryPath)));
    } else if (/\.[cm]?[jt]sx?$/u.test(entry.name)) {
      files.push(entryPath);
    }
  }
  return files;
}

export async function checkDependencies() {
  const directories = [
    ...(await packageDirectories("apps")),
    ...(await packageDirectories("packages")),
  ];
  const manifests = new Map();

  for (const directory of directories) {
    const manifest = await readJson(path.join(directory, "package.json"));
    if (typeof manifest.name !== "string") {
      throw new Error(`Missing package name: ${directory}`);
    }
    manifests.set(manifest.name, { directory, manifest });
  }

  const graph = new Map();
  for (const [name, { manifest }] of manifests) {
    const dependencies = workspaceDependencies(manifest);
    const missing = dependencies.filter((dependency) => !manifests.has(dependency));
    if (missing.length > 0) {
      throw new Error(`${name} references missing workspaces: ${missing.join(", ")}`);
    }
    graph.set(name, dependencies);
  }

  const cycle = findCycle(graph);
  if (cycle !== null) {
    throw new Error(`Workspace dependency cycle: ${cycle.join(" -> ")}`);
  }

  const sharedPackages = [...manifests.entries()].filter(
    ([name]) => name.startsWith("@serialos/") && name !== "@serialos/web",
  );
  for (const [name, { directory, manifest }] of sharedPackages) {
    const declared = new Set([
      ...Object.keys(manifest.dependencies ?? {}),
      ...Object.keys(manifest.devDependencies ?? {}),
    ]);
    if (declared.has("next")) {
      throw new Error(`${name} must not depend on Next.js`);
    }

    const sourceDirectory = path.join(directory, "src");
    for (const filePath of await sourceFiles(sourceDirectory)) {
      const source = await readFile(filePath, "utf8");
      if (/from\s+["']next(?:\/[^"']*)?["']/u.test(source)) {
        throw new Error(`${path.relative(repositoryRoot, filePath)} imports Next.js`);
      }
    }
  }

  for (const boundaryName of ["@serialos/domain", "@serialos/application"]) {
    const manifest = manifests.get(boundaryName)?.manifest;
    if (manifest === undefined) {
      throw new Error(`Missing required boundary ${boundaryName}`);
    }
    const forbidden = Object.keys(manifest.dependencies ?? {}).filter(
      (dependency) =>
        dependency === "next" ||
        dependency === "pg" ||
        dependency.startsWith("@aws-sdk/") ||
        dependency.includes("openai") ||
        dependency.includes("drizzle"),
    );
    if (forbidden.length > 0) {
      throw new Error(`${boundaryName} has forbidden dependencies: ${forbidden.join(", ")}`);
    }
  }

  return { packages: manifests.size };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await checkDependencies();
  process.stdout.write(`Dependency graph valid: ${result.packages} workspaces, 0 cycles.\n`);
}
