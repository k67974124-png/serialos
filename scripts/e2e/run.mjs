import { spawn } from "node:child_process";
import { cp, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const migrationCli = path.join(repositoryRoot, "packages", "db", "src", "migrations", "cli.ts");

export function runNode(args, env = process.env, options = {}) {
  const cwd = options.cwd ?? repositoryRoot;
  const executable = options.executable ?? process.execPath;
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, {
      cwd,
      env,
      stdio: "inherit",
      windowsHide: true,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Child process failed with ${signal ?? `exit code ${String(code)}`}`));
    });
  });
}

export function startNode(args, env = process.env, options = {}) {
  return spawn(process.execPath, args, {
    cwd: options.cwd ?? repositoryRoot,
    env,
    stdio: options.stdio ?? ["ignore", "inherit", "inherit"],
    windowsHide: true,
  });
}

export async function stopProcess(child, timeoutMs = 5_000) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }
  const exited = new Promise((resolve) => {
    child.once("exit", resolve);
  });
  child.kill("SIGTERM");
  const timedOut = await Promise.race([
    exited.then(() => false),
    new Promise((resolve) => {
      globalThis.setTimeout(() => resolve(true), timeoutMs);
    }),
  ]);
  if (timedOut) {
    child.kill("SIGKILL");
    await exited;
  }
}

async function waitForHealth(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  let latest = "no response";
  while (Date.now() < deadline) {
    try {
      const response = await globalThis.fetch(url, {
        signal: globalThis.AbortSignal.timeout(2_000),
      });
      latest = `${String(response.status)} ${await response.text()}`;
      if (response.ok) {
        return;
      }
    } catch (error) {
      latest = error instanceof Error ? error.message : "unknown health error";
    }
    await new Promise((resolve) => globalThis.setTimeout(resolve, 500));
  }
  throw new Error(`Health check failed for ${url}: ${latest}`);
}

export async function prepareStandaloneAssets(root = repositoryRoot) {
  const source = path.join(root, "apps", "web", ".next", "static");
  const destination = path.join(
    root,
    "apps",
    "web",
    ".next",
    "standalone",
    "apps",
    "web",
    ".next",
    "static",
  );
  await rm(destination, { force: true, recursive: true });
  await cp(source, destination, { recursive: true });
}

export function resolvePnpmEntrypoint(env = process.env) {
  const entrypoint = env.npm_execpath;
  if (entrypoint === undefined || entrypoint.length === 0) {
    throw new Error("Run E2E through the pnpm test:e2e script");
  }
  return entrypoint;
}

export async function runE2e(options = {}) {
  const env = options.env ?? process.env;
  const root = options.repositoryRoot ?? repositoryRoot;
  const pnpmEntrypoint = options.pnpmEntrypoint ?? resolvePnpmEntrypoint(env);
  const databaseUrl =
    env.TEST_DATABASE_URL ??
    "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test";
  const webPort = "53010";
  const e2eEnvironment = {
    ...env,
    AI_RUN_HARD_BUDGET_USD: "8",
    AI_RUN_SOFT_BUDGET_USD: "3",
    APP_URL: `http://127.0.0.1:${webPort}`,
    DATABASE_URL: databaseUrl,
    HOSTNAME: "127.0.0.1",
    NODE_ENV: "test",
    PORT: webPort,
    S3_ACCESS_KEY_ID: env.TEST_S3_ACCESS_KEY_ID ?? "minio-test",
    S3_BUCKET: env.TEST_S3_BUCKET ?? "serialos-test",
    S3_ENDPOINT: env.TEST_S3_ENDPOINT ?? "http://127.0.0.1:59000",
    S3_FORCE_PATH_STYLE: "true",
    S3_REGION: "us-east-1",
    S3_SECRET_ACCESS_KEY: env.TEST_S3_SECRET_ACCESS_KEY ?? "serialos-minio-test-only",
    SERIALOS_E2E_MANAGED_SERVER: "true",
    WEB_PORT: webPort,
    WORKER_HEALTH_HOST: "127.0.0.1",
    WORKER_HEALTH_PORT: "53011",
  };
  await runNode(["--import", "tsx", migrationCli], e2eEnvironment, { cwd: root });
  await runNode([pnpmEntrypoint, "build"], e2eEnvironment, { cwd: root });
  await prepareStandaloneAssets(root);

  const standaloneServer = path.join(
    root,
    "apps",
    "web",
    ".next",
    "standalone",
    "apps",
    "web",
    "server.js",
  );
  const web = startNode([standaloneServer], e2eEnvironment, {
    cwd: path.dirname(standaloneServer),
  });
  try {
    await waitForHealth(`http://127.0.0.1:${webPort}/health/live`);
    await runNode([pnpmEntrypoint, "exec", "playwright", "test"], e2eEnvironment, { cwd: root });
  } finally {
    await stopProcess(web);
  }
}

const invokedPath = process.argv[1] === undefined ? undefined : path.resolve(process.argv[1]);
if (invokedPath === fileURLToPath(import.meta.url)) {
  await runE2e();
}
