import { pathToFileURL } from "node:url";

import { parseRuntimeConfig } from "@serialos/config";
import { PostgresHealthProbe, PostgresQueueHealthProbe } from "@serialos/db";
import { S3BucketHealthProbe } from "@serialos/storage";

import { createPostgresWorkerRuntime, type WorkerRuntimeController } from "./durable-worker.js";
import { startWorkerHealthServer } from "./health-server.js";

export const WORKER_PROCESS_NAME = "serialos-worker" as const;

export function describeWorkerProcess(): Readonly<{ process: typeof WORKER_PROCESS_NAME }> {
  return { process: WORKER_PROCESS_NAME };
}

export interface WorkerProcessOptions {
  readonly runtime?: WorkerRuntimeController;
}

async function closeHealthServer(
  server: Awaited<ReturnType<typeof startWorkerHealthServer>>,
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error !== undefined) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

export async function startWorkerProcess(options: WorkerProcessOptions = {}): Promise<void> {
  const config = parseRuntimeConfig(process.env);
  const database = new PostgresHealthProbe(config.databaseUrl);
  const queue = new PostgresQueueHealthProbe(config.databaseUrl);
  const objectStorage = new S3BucketHealthProbe(config.objectStorage);
  const runtime =
    options.runtime ??
    createPostgresWorkerRuntime({
      concurrency: config.jobs.concurrency,
      databaseUrl: config.databaseUrl,
      leaseDurationMs: config.jobs.leaseDurationMs,
    });
  let server;
  try {
    server = await startWorkerHealthServer({
      host: config.workerHealthHost,
      port: config.workerHealthPort,
      probes: [database, queue, objectStorage],
    });
  } catch {
    objectStorage.destroy();
    await Promise.allSettled([database.close(), queue.close(), runtime.close()]);
    throw new Error("Worker health server failed to start");
  }
  try {
    runtime.start();
  } catch {
    objectStorage.destroy();
    await Promise.allSettled([
      closeHealthServer(server),
      database.close(),
      queue.close(),
      runtime.close(),
    ]);
    throw new Error("Durable Worker runtime failed to start");
  }

  const stop = async (): Promise<void> => {
    let runtimeFailure: unknown;
    try {
      await runtime.shutdown(config.jobs.drainTimeoutMs);
    } catch (error) {
      runtimeFailure = error;
    }
    try {
      await closeHealthServer(server);
    } finally {
      await database.close();
      await queue.close();
      objectStorage.destroy();
      await runtime.close();
    }
    if (runtimeFailure !== undefined) {
      throw new Error("Durable Worker shutdown failed");
    }
  };

  let shutdown: Promise<void> | undefined;
  const beginShutdown = (): void => {
    shutdown ??= stop().catch(() => {
      process.stderr.write("Worker shutdown failed.\n");
      process.exitCode = 1;
    });
  };

  process.once("SIGINT", beginShutdown);
  process.once("SIGTERM", beginShutdown);
}

const entrypoint = process.argv[1];
if (entrypoint !== undefined && import.meta.url === pathToFileURL(entrypoint).href) {
  await startWorkerProcess();
}
