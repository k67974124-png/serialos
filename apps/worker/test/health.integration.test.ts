import { once } from "node:events";

import type { DependencyProbe } from "@serialos/application";
import { afterEach, describe, expect, it } from "vitest";

import { startWorkerHealthServer } from "../src/health-server.js";

const servers: Array<Awaited<ReturnType<typeof startWorkerHealthServer>>> = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(async (server) => {
      server.close();
      await once(server, "close");
    }),
  );
});

function probe(name: string, available: boolean): DependencyProbe {
  return {
    name,
    check: () => (available ? Promise.resolve() : Promise.reject(new Error("private cause"))),
  };
}

describe("worker health server", () => {
  it("keeps liveness healthy while readiness fails closed", async () => {
    const server = await startWorkerHealthServer({
      host: "127.0.0.1",
      port: 0,
      probes: [probe("database", false)],
    });
    servers.push(server);
    const address = server.address();
    if (address === null || typeof address === "string") {
      throw new Error("Expected a TCP address");
    }

    const [live, ready] = await Promise.all([
      fetch(`http://127.0.0.1:${String(address.port)}/health/live`),
      fetch(`http://127.0.0.1:${String(address.port)}/health/ready`),
    ]);

    expect(live.status).toBe(200);
    expect(ready.status).toBe(503);
    expect(await ready.text()).not.toContain("private cause");
  });
});
