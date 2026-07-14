import { describe, expect, it } from "vitest";

import { createLivenessResponse, createReadinessResponse, type DependencyProbe } from "./health.js";

const instant = new Date("2026-07-13T06:00:00.000Z");

function probe(name: string, available: boolean): DependencyProbe {
  return {
    name,
    check: () => (available ? Promise.resolve() : Promise.reject(new Error("sensitive detail"))),
  };
}

describe("health semantics", () => {
  it("keeps liveness independent from dependencies", () => {
    expect(createLivenessResponse(instant)).toEqual({
      checkedAt: "2026-07-13T06:00:00.000Z",
      dependencies: {},
      status: "ok",
    });
  });

  it("reports readiness only when every required dependency responds", async () => {
    await expect(
      createReadinessResponse([probe("database", true), probe("object_storage", false)], instant),
    ).resolves.toEqual({
      checkedAt: "2026-07-13T06:00:00.000Z",
      dependencies: { database: "ok", object_storage: "unavailable" },
      status: "unavailable",
    });
  });
});
