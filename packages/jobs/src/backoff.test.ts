import { describe, expect, it } from "vitest";

import { calculateRetryDelayMs } from "./backoff.js";
import { assertJobCheckpoint, assertMinimalJobPayload, UnsafeJobDataError } from "./validation.js";

describe("durable job safety primitives", () => {
  it("computes bounded exponential retry with deterministic jitter", () => {
    const jobId = "90000000-0000-4000-8000-000000000001";
    const options = { initialDelayMs: 1_000, jitterRatio: 0.2, maximumDelayMs: 10_000 };
    expect(calculateRetryDelayMs(jobId, 3, options)).toBe(calculateRetryDelayMs(jobId, 3, options));
    expect(calculateRetryDelayMs(jobId, 3, options)).toBeGreaterThanOrEqual(3_200);
    expect(calculateRetryDelayMs(jobId, 3, options)).toBeLessThanOrEqual(4_800);
    expect(calculateRetryDelayMs(jobId, 10, options)).toBeLessThanOrEqual(12_000);
  });

  it("rejects raw content in payloads and records provider IDs only in checkpoints", () => {
    expect(() => {
      assertMinimalJobPayload({
        contentRunId: "71000000-0000-4000-8000-000000000001",
        contentRunVersion: 2,
      });
    }).not.toThrow();
    expect(() => {
      assertMinimalJobPayload({ rawText: "synthetic body" });
    }).toThrow(UnsafeJobDataError);
    expect(() => {
      assertJobCheckpoint({
        completedSteps: ["extract"],
        providerRequestIds: { extract: "opaque-provider-request-1" },
        resultIds: { extract: "91000000-0000-4000-8000-000000000001" },
      });
    }).not.toThrow();
  });
});
