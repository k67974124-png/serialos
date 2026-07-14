import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const commands = new Map([
  [
    "up",
    {
      file: "compose.yaml",
      steps: [
        ["up", "-d", "--wait", "--wait-timeout", "120", "postgres", "minio", "mailpit"],
        ["run", "--rm", "--no-deps", "minio-bootstrap"],
      ],
    },
  ],
  ["down", { file: "compose.yaml", steps: [["down", "--remove-orphans"]] }],
  ["clean", { file: "compose.yaml", steps: [["down", "--volumes", "--remove-orphans"]] }],
  [
    "test-up",
    {
      file: "compose.test.yaml",
      steps: [
        ["up", "-d", "--wait", "--wait-timeout", "120", "postgres", "minio", "mailpit"],
        ["run", "--rm", "--no-deps", "minio-bootstrap"],
      ],
    },
  ],
  ["test-down", { file: "compose.test.yaml", steps: [["down", "--remove-orphans"]] }],
]);

const commandName = process.argv[2];
const command = commands.get(commandName);
if (command === undefined) {
  throw new Error(`Unsupported infrastructure command: ${String(commandName)}`);
}

if (commandName === "clean") {
  process.stderr.write(
    "Removing only serialos-dev/serialos-test containers and their local volumes.\n",
  );
  for (const composeFile of ["compose.yaml", "compose.test.yaml"]) {
    const result = spawnSync(
      "docker",
      [
        "compose",
        "-f",
        path.join(repositoryRoot, composeFile),
        "down",
        "--volumes",
        "--remove-orphans",
      ],
      {
        cwd: repositoryRoot,
        encoding: "utf8",
        stdio: "inherit",
      },
    );
    if (result.error !== undefined) {
      throw result.error;
    }
    if (result.status !== 0) {
      process.exitCode = result.status ?? 1;
      break;
    }
  }
}

if (commandName !== "clean") {
  for (const step of command.steps) {
    const result = spawnSync(
      "docker",
      ["compose", "-f", path.join(repositoryRoot, command.file), ...step],
      {
        cwd: repositoryRoot,
        encoding: "utf8",
        stdio: "inherit",
      },
    );
    if (result.error !== undefined) {
      throw result.error;
    }
    if (result.status !== 0) {
      process.exitCode = result.status ?? 1;
      break;
    }
  }
}
