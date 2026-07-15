import { asJobId, asRequestId } from "@serialos/domain";
import { describe, expect, it } from "vitest";

import { correlateJob, correlateProviderCall } from "./correlation.js";
import { StructuredLogger } from "./logger.js";
import { InMemoryMetricsRegistry } from "./metrics.js";
import { redactLogValue } from "./redaction.js";
import { OpenTelemetryTracer } from "./tracing.js";

function parseLog(line: string): Readonly<Record<string, unknown>> {
  const parsed: unknown = JSON.parse(line);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new TypeError("Structured log line must be an object");
  }
  return parsed as Readonly<Record<string, unknown>>;
}

describe("observability safety primitives", () => {
  it("redacts nested credentials, signed URLs, raw content, arrays, and errors", () => {
    const secret = "SECRET_SENTINEL";
    const signedUrl =
      "http://127.0.0.1:59000/private/file?X-Amz-Signature=abc&X-Amz-Credential=credential";
    const error = new Error(`Bearer bearer-token ${secret}`);
    error.stack = `stack ${secret}`;
    const fixture = {
      Authorization: "Bearer bearer-token",
      nested: [
        { api_key: "sk-secretvalue", cookie: "serialos_session=secret" },
        { emailBody: "private mail", signedUrl },
        error,
      ],
      normalizedText: `raw creator content ${secret}`,
      safe: `download failed at ${signedUrl}`,
    };

    const serialized = JSON.stringify(redactLogValue(fixture));
    expect(serialized).not.toContain(secret);
    expect(serialized).not.toContain("bearer-token");
    expect(serialized).not.toContain("sk-secretvalue");
    expect(serialized).not.toContain("serialos_session");
    expect(serialized).not.toContain("X-Amz-Signature");
    expect(serialized).not.toContain("raw creator content");
    expect(serialized).not.toContain("stack");
    expect(serialized).toContain("[REDACTED]");
    expect(serialized).toContain("[REDACTED_SIGNED_URL]");
  });

  it("redacts credential and creator-content key variants reported by independent acceptance", () => {
    const sentinel = "SYNTHETIC_CREDENTIAL_SENTINEL_7788";
    const fixture = {
      S3_SECRET_ACCESS_KEY: sentinel,
      content: sentinel,
      material: sentinel,
      nested: [{ openai_api_key: sentinel }, { secretKey: sentinel }, { TRANSCRIPTION: sentinel }],
    };

    const serialized = JSON.stringify(redactLogValue(fixture));
    expect(serialized).not.toContain(sentinel);
    expect(serialized.match(/\[REDACTED\]/gu)).toHaveLength(6);
  });

  it("does not let an unknown object crash structured logging", () => {
    const lines: string[] = [];
    const logger = new StructuredLogger(
      { write: (line) => lines.push(line) },
      { now: () => new Date("2026-07-13T00:00:00.000Z") },
    );
    const unknownObject = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("synthetic proxy failure");
        },
      },
    );

    expect(() => {
      logger.log("warn", "logging.unknown_object", {
        result: unknownObject,
      } as unknown as Parameters<StructuredLogger["log"]>[2]);
    }).not.toThrow();
    expect(lines).toHaveLength(1);
    expect(parseLog(lines[0] ?? "")).toMatchObject({ event: "logging.unknown_object" });
    expect(lines[0]).not.toContain("synthetic proxy failure");
  });

  it("writes one deterministic JSON event with correlation and no signed URL", () => {
    const lines: string[] = [];
    const logger = new StructuredLogger(
      { write: (line) => lines.push(line) },
      { now: () => new Date("2026-07-13T00:00:00.000Z") },
    );
    logger.log("info", "storage.signed_read", {
      jobId: "00000000-0000-4000-8000-000000000071",
      requestId: "00000000-0000-4000-8000-000000000072",
      result: "rejected",
      signedUrl: "https://objects.example.test/a?X-Amz-Signature=private",
      traceId: "trace-1",
    } as unknown as Parameters<StructuredLogger["log"]>[2]);

    expect(lines).toHaveLength(1);
    const entry = parseLog(lines[0] ?? "");
    expect(entry.event).toBe("storage.signed_read");
    expect(entry.time).toBe("2026-07-13T00:00:00.000Z");
    expect(entry.result).toBe("rejected");
    expect(lines[0]).not.toContain("X-Amz-Signature");
  });

  it("drops fields outside the documented structured-log allowlist", () => {
    const sentinel = "RAW_CREATOR_SENTINEL";
    const lines: string[] = [];
    const logger = new StructuredLogger(
      { write: (line) => lines.push(line) },
      { now: () => new Date("2026-07-13T00:00:00.000Z") },
    );
    logger.log("info", "content.rejected", {
      requestId: "00000000-0000-4000-8000-000000000072",
      result: "rejected",
      article: sentinel,
      creatorNote: sentinel,
    } as unknown as Parameters<StructuredLogger["log"]>[2]);

    expect(lines).toHaveLength(1);
    expect(lines[0]).not.toContain(sentinel);
    expect(lines[0]).not.toContain("article");
    expect(lines[0]).not.toContain("creatorNote");
    expect(parseLog(lines[0] ?? "")).toMatchObject({ result: "rejected" });
  });

  it("drops raw text smuggled through an allowed structured-log key", () => {
    const sentinel = "RAW_CREATOR_SENTINEL";
    const lines: string[] = [];
    const logger = new StructuredLogger(
      { write: (line) => lines.push(line) },
      { now: () => new Date("2026-07-13T00:00:00.000Z") },
    );

    logger.log("error", "content.rejected", { result: sentinel });

    expect(lines).toHaveLength(1);
    expect(lines[0]).not.toContain(sentinel);
    expect(parseLog(lines[0] ?? "")).not.toHaveProperty("result");
  });

  it("preserves request-to-job-to-provider correlation", () => {
    const request = {
      requestId: asRequestId("00000000-0000-4000-8000-000000000073"),
      traceId: "trace-73",
    };
    const job = correlateJob(request, asJobId("00000000-0000-4000-8000-000000000074"));
    const provider = correlateProviderCall(job, "provider-request-74");

    expect(provider).toEqual({
      jobId: "00000000-0000-4000-8000-000000000074",
      providerRequestId: "provider-request-74",
      requestId: "00000000-0000-4000-8000-000000000073",
      traceId: "trace-73",
    });
  });

  it("records bounded in-process counters and histograms", () => {
    const metrics = new InMemoryMetricsRegistry();
    metrics.increment("jobs_claimed_total", 1, { result: "claimed" });
    metrics.increment("jobs_claimed_total", 2, { result: "claimed" });
    metrics.observe("provider_latency_ms", 20, { provider: "fixture" });
    metrics.observe("provider_latency_ms", 30, { provider: "fixture" });

    expect(metrics.snapshot()).toEqual({
      counters: [{ labels: { result: "claimed" }, name: "jobs_claimed_total", value: 3 }],
      histograms: [
        {
          count: 2,
          labels: { provider: "fixture" },
          max: 30,
          min: 20,
          name: "provider_latency_ms",
          sum: 50,
        },
      ],
    });
    expect(() => {
      metrics.increment("jobs_claimed_total", 1, { email: "person@example.test" });
    }).toThrow(RangeError);
  });

  it("exposes an OpenTelemetry adapter without requiring an exporter", () => {
    const tracer = new OpenTelemetryTracer("serialos-test");
    const span = tracer.startSpan("job.execute", {
      jobId: asJobId("00000000-0000-4000-8000-000000000075"),
      providerRequestId: "provider-request-75",
      requestId: asRequestId("00000000-0000-4000-8000-000000000076"),
      traceId: "trace-76",
    });
    span.setAttribute("job.attempt", 1);
    span.fail("SYNTHETIC_ERROR");
    expect(() => {
      span.end();
    }).not.toThrow();
  });
});
