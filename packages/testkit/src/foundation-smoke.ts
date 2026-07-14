import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { asWorkspaceId } from "@serialos/domain";
import { S3ObjectStorage } from "@serialos/storage";
import { Pool } from "pg";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const databaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test";
const storageOptions = {
  accessKeyId: process.env.TEST_S3_ACCESS_KEY_ID ?? "minio-test",
  bucket: process.env.TEST_S3_BUCKET ?? "serialos-test",
  endpoint: process.env.TEST_S3_ENDPOINT ?? "http://127.0.0.1:59000",
  forcePathStyle: true,
  region: "us-east-1",
  secretAccessKey: process.env.TEST_S3_SECRET_ACCESS_KEY ?? "serialos-minio-test-only",
} as const;
const webPort = 53_000;
const workerPort = 53_001;
const smokeEnvironment = {
  ...process.env,
  AI_RUN_HARD_BUDGET_USD: "8",
  AI_RUN_SOFT_BUDGET_USD: "3",
  APP_URL: `http://127.0.0.1:${String(webPort)}`,
  DATABASE_URL: databaseUrl,
  FEATURE_LIVE_PROVIDER_TESTS: "false",
  NODE_ENV: "test",
  OPENAI_API_KEY: "",
  HOSTNAME: "127.0.0.1",
  PORT: String(webPort),
  S3_ACCESS_KEY_ID: storageOptions.accessKeyId,
  S3_BUCKET: storageOptions.bucket,
  S3_ENDPOINT: storageOptions.endpoint,
  S3_FORCE_PATH_STYLE: "true",
  S3_REGION: storageOptions.region,
  S3_SECRET_ACCESS_KEY: storageOptions.secretAccessKey,
  WEB_PORT: String(webPort),
  WORKER_HEALTH_HOST: "127.0.0.1",
  WORKER_HEALTH_PORT: String(workerPort),
};

function run(command: string, args: readonly string[]): void {
  const result = spawnSync(command, [...args], {
    cwd: repositoryRoot,
    env: smokeEnvironment,
    stdio: "inherit",
    windowsHide: true,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Foundation smoke subprocess exited with code ${String(result.status)}`);
  }
}

function runPnpm(args: readonly string[]): void {
  const pnpmEntrypoint = process.env.npm_execpath;
  if (pnpmEntrypoint === undefined || pnpmEntrypoint.length === 0) {
    throw new Error("Run foundation smoke through the pnpm smoke script");
  }
  run(process.execPath, [pnpmEntrypoint, ...args]);
}

function startNode(args: readonly string[], cwd = repositoryRoot): ChildProcess {
  const child = spawn(process.execPath, [...args], {
    cwd,
    env: smokeEnvironment,
    stdio: ["ignore", "inherit", "inherit"],
    windowsHide: true,
  });
  return child;
}

async function stopProcess(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }
  const exited = new Promise<"exit">((resolve) => {
    child.once("exit", () => {
      resolve("exit");
    });
  });
  child.kill("SIGTERM");
  const timeout = new Promise<"timeout">((resolve) => {
    setTimeout(() => {
      resolve("timeout");
    }, 5_000);
  });
  if ((await Promise.race([exited, timeout])) === "timeout") {
    child.kill("SIGKILL");
  }
}

async function waitForHealth(url: string): Promise<void> {
  const deadline = Date.now() + 60_000;
  let latest = "no response";
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
      latest = `${String(response.status)} ${await response.text()}`;
      if (response.ok) {
        return;
      }
    } catch (error) {
      latest = error instanceof Error ? error.message : "unknown health error";
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Health check failed for ${url}: ${latest}`);
}

async function databaseRoundTrip(): Promise<void> {
  const pool = new Pool({ connectionString: databaseUrl, max: 1 });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "CREATE TEMP TABLE serialos_smoke_roundtrip (value text NOT NULL) ON COMMIT DROP",
    );
    await client.query("INSERT INTO serialos_smoke_roundtrip (value) VALUES ($1)", [
      "synthetic-e00",
    ]);
    const result = await client.query<{ value: string }>(
      "SELECT value FROM serialos_smoke_roundtrip",
    );
    if (result.rows[0]?.value !== "synthetic-e00") {
      throw new Error("PostgreSQL smoke roundtrip returned unexpected data");
    }
    await client.query("ROLLBACK");
  } finally {
    client.release();
    await pool.end();
  }
}

async function storageRoundTrip(): Promise<void> {
  const storage = new S3ObjectStorage(storageOptions);
  const workspaceId = asWorkspaceId("00000000-0000-4000-8000-000000000008");
  const key = `smoke/${String(process.pid)}.txt`;
  const bytes = new TextEncoder().encode("synthetic-e00");
  try {
    await storage.put({ body: bytes, contentType: "text/plain", key, workspaceId });
    const stored = await storage.get(workspaceId, key);
    if (new TextDecoder().decode(stored.body) !== "synthetic-e00") {
      throw new Error("Object storage smoke roundtrip returned unexpected data");
    }
  } finally {
    await storage.delete(workspaceId, key);
    storage.destroy();
  }
}

async function main(): Promise<void> {
  runPnpm(["build"]);
  runPnpm(["db:migrate"]);
  runPnpm(["db:seed"]);

  await databaseRoundTrip();
  await storageRoundTrip();

  const standaloneServer = path.join(
    repositoryRoot,
    "apps",
    "web",
    ".next",
    "standalone",
    "apps",
    "web",
    "server.js",
  );
  const web = startNode([standaloneServer], path.dirname(standaloneServer));
  const worker = startNode([path.join(repositoryRoot, "apps", "worker", "dist", "main.js")]);
  try {
    await waitForHealth(`http://127.0.0.1:${String(webPort)}/health/live`);
    await waitForHealth(`http://127.0.0.1:${String(webPort)}/health/ready`);
    await waitForHealth(`http://127.0.0.1:${String(workerPort)}/health/live`);
    await waitForHealth(`http://127.0.0.1:${String(workerPort)}/health/ready`);
  } finally {
    await Promise.all([stopProcess(web), stopProcess(worker)]);
  }

  process.stdout.write(
    "Foundation smoke passed: production Web, Worker, PostgreSQL, and object storage.\n",
  );
}

await main();
