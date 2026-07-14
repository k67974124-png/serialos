import { createServer, type Server, type ServerResponse } from "node:http";

import {
  createLivenessResponse,
  createReadinessResponse,
  type DependencyProbe,
} from "@serialos/application";

export interface WorkerHealthServerOptions {
  readonly host: string;
  readonly port: number;
  readonly probes: readonly DependencyProbe[];
}

function writeJson(response: ServerResponse, status: number, body: object): void {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

export async function startWorkerHealthServer(options: WorkerHealthServerOptions): Promise<Server> {
  const server = createServer((request, response) => {
    if (request.method !== "GET") {
      writeJson(response, 404, { error: "not_found" });
      return;
    }
    if (request.url === "/health/live") {
      writeJson(response, 200, createLivenessResponse(new Date()));
      return;
    }
    if (request.url === "/health/ready") {
      void createReadinessResponse(options.probes, new Date()).then((health) => {
        writeJson(response, health.status === "ok" ? 200 : 503, health);
      });
      return;
    }
    writeJson(response, 404, { error: "not_found" });
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(options.port, options.host, () => {
      server.off("error", reject);
      resolve();
    });
  });
  return server;
}
