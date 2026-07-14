import { describe, expect, it } from "vitest";

import { AuditService, type AppendOnlyAuditWriter, type AuditEvent } from "./audit.js";
import { InMemoryRateLimiter } from "./rate-limiter.js";
import { assertTrustedRequestOrigin, UntrustedRequestOriginError } from "./request-security.js";

class RecordingAuditWriter implements AppendOnlyAuditWriter {
  public readonly events: AuditEvent[] = [];

  public append(event: AuditEvent): Promise<void> {
    this.events.push(event);
    return Promise.resolve();
  }
}

describe("application security primitives", () => {
  it("rate-limits deterministically and resets only after the fixed window", () => {
    let now = new Date("2026-07-13T00:00:00.000Z");
    const limiter = new InMemoryRateLimiter({ now: () => new Date(now) });
    const policy = { limit: 2, windowMs: 60_000 };

    expect(limiter.consume("workspace:synthetic", policy)).toMatchObject({
      allowed: true,
      remaining: 1,
      retryAfterMs: 0,
    });
    expect(limiter.consume("workspace:synthetic", policy)).toMatchObject({
      allowed: true,
      remaining: 0,
    });
    expect(limiter.consume("workspace:synthetic", policy)).toMatchObject({
      allowed: false,
      remaining: 0,
      retryAfterMs: 60_000,
    });

    now = new Date("2026-07-13T00:01:00.000Z");
    expect(limiter.consume("workspace:synthetic", policy)).toMatchObject({
      allowed: true,
      remaining: 1,
    });
  });

  it("requires same-origin unsafe requests while allowing safe methods", () => {
    expect(() => {
      assertTrustedRequestOrigin("GET", undefined, "https://serialos.example");
    }).not.toThrow();
    expect(() => {
      assertTrustedRequestOrigin(
        "POST",
        "https://serialos.example",
        "https://serialos.example/app",
      );
    }).not.toThrow();
    expect(() => {
      assertTrustedRequestOrigin("POST", "https://attacker.example", "https://serialos.example");
    }).toThrow(UntrustedRequestOriginError);
    expect(() => {
      assertTrustedRequestOrigin("DELETE", undefined, "https://serialos.example");
    }).toThrow(UntrustedRequestOriginError);
  });

  it("creates append-only audit events with bounded summaries", async () => {
    const writer = new RecordingAuditWriter();
    const service = new AuditService(
      writer,
      { now: () => new Date("2026-07-13T00:00:00.000Z") },
      { generate: () => "00000000-0000-4000-8000-000000000077" },
    );
    await expect(
      service.record({
        action: "workspace.settings_changed",
        actorType: "user",
        actorUserId: "00000000-0000-4000-8000-000000000078",
        afterSummary: { changedFields: ["timezone"] },
        beforeSummary: { changedFields: [] },
        requestId: "00000000-0000-4000-8000-000000000079",
        resourceId: "00000000-0000-4000-8000-000000000080",
        resourceType: "workspace",
        workspaceId: "00000000-0000-4000-8000-000000000081",
      }),
    ).resolves.toMatchObject({
      createdAt: new Date("2026-07-13T00:00:00.000Z"),
      id: "00000000-0000-4000-8000-000000000077",
    });
    expect(writer.events).toHaveLength(1);
    await expect(
      service.record({
        action: "workspace.settings_changed",
        actorType: "user",
        actorUserId: null,
        afterSummary: { rawContent: "must never enter audit" },
        beforeSummary: null,
        requestId: "request",
        resourceId: null,
        resourceType: "workspace",
        workspaceId: null,
      }),
    ).rejects.toThrow("sensitive field");
  });
});
