import { pathToFileURL } from "node:url";

import { parseRuntimeConfig } from "@serialos/config";
import { PostgresHealthProbe } from "@serialos/db";
import { S3BucketHealthProbe } from "@serialos/storage";

import { startWorkerHealthServer } from "./health-server.js";

export const WORKER_PROCESS_NAME = "serialos-worker" as const;

export function describeWorkerProcess(): Readonly<{ process: typeof WORKER_PROCESS_NAME }> {
  return { process: WORKER_PROCESS_NAME };
}

export interface WorkerDrainer {
  shutdown(drainTimeoutMs: number): Promise<boolean>;
}

export interface WorkerProcessOptions {
  readonly drainer?: WorkerDrainer;
}

export async function startWorkerProcess(options: WorkerProcessOptions = {}): Promise<void> {
  const config = parseRuntimeConfig(process.env);
  const database = new PostgresHealthProbe(config.databaseUrl);
  const objectStorage = new S3BucketHealthProbe(config.objectStorage);
  const server = await startWorkerHealthServer({
    host: config.workerHealthHost,
    port: config.workerHealthPort,
    probes: [database, objectStorage],
  });

  const stop = async (): Promise<void> => {
    await options.drainer?.shutdown(config.jobs.drainTimeoutMs);
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
          return;
        }
        resolve();
      });
    });
    await database.close();
    objectStorage.destroy();
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
