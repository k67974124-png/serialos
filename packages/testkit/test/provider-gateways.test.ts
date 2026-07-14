import {
  ConfiguredModelRoutingPolicy,
  ImmutableAssetRegistry,
  InvalidAssetReferenceError,
  MissingModelRouteError,
  type ModelRoute,
  type ProviderGatewayError,
  type RuntimeSchema,
} from "@serialos/ai";
import { describe, expect, it } from "vitest";

import { DeterministicProviderFakes } from "../src/provider-fakes.js";

const route: ModelRoute = {
  modelId: "fixture-model-v1",
  pricing: {
    inputMicrosUsdPerMillionTokens: 10_000n,
    outputMicrosUsdPerMillionTokens: 20_000n,
  },
  provider: "fixture-provider",
  reasoningLevel: "fixture-reasoning",
};

const schema: RuntimeSchema<{ readonly fixture: string }> = {
  parse(value: unknown) {
    if (
      typeof value !== "object" ||
      value === null ||
      !("fixture" in value) ||
      typeof value.fixture !== "string"
    ) {
      throw new TypeError("fixture schema mismatch");
    }
    return { fixture: value.fixture };
  },
};

describe("configured provider boundaries", () => {
  it("routes only through injected model, reasoning, and pricing metadata", () => {
    const policy = new ConfiguredModelRoutingPolicy({ draft: route });

    expect(policy.route("draft")).toEqual(route);
    expect(() => policy.route("edit")).toThrow(MissingModelRouteError);
    expect(() =>
      new ConfiguredModelRoutingPolicy({
        draft: { ...route, modelId: "" },
      }).route("draft"),
    ).toThrow(RangeError);
  });

  it("returns deterministic validated data and complete provider metadata", async () => {
    const gateway = new DeterministicProviderFakes({ scenario: "success" });
    const request = {
      input: { materialId: "00000000-0000-4000-8000-000000000001" },
      promptId: "extract.insight",
      promptVersion: "1.0.0",
      route,
      schemaId: "extract.insight.output",
      schemaVersion: "1.0.0",
    } as const;

    const first = await gateway.generate(request, schema);
    const second = await gateway.generate(request, schema);

    expect(first).toEqual(second);
    expect(first).toEqual({
      data: { fixture: "deterministic" },
      metadata: {
        costMicrosUsd: 125n,
        latencyMs: 25,
        modelId: "fixture-model-v1",
        provider: "fixture-provider",
        providerRequestId: "fake-provider-request-1",
        reasoningLevel: "fixture-reasoning",
        schemaVersion: "1.0.0",
        status: "succeeded",
        usage: { inputTokens: 10, outputTokens: 5, totalTokens: 15 },
      },
    });
  });

  it.each([
    ["schema_invalid", "schema_invalid", false, null],
    ["rate_limited", "rate_limited", true, 1_000],
    ["timeout", "timeout", true, null],
    ["server_error", "server_error", true, null],
    ["canceled", "canceled", false, null],
    ["metadata_invalid", "metadata_invalid", false, null],
  ] as const)(
    "exposes the %s fake failure without leaking provider values",
    async (scenario, kind, retryable, retryAfterMs) => {
      const gateway = new DeterministicProviderFakes({ scenario });

      await expect(
        gateway.generate(
          {
            input: {},
            promptId: "fixture.prompt",
            promptVersion: "1.0.0",
            route,
            schemaId: "fixture.output",
            schemaVersion: "1.0.0",
          },
          schema,
        ),
      ).rejects.toMatchObject({
        kind,
        retryAfterMs,
        retryable,
      } satisfies Partial<ProviderGatewayError>);
    },
  );

  it("supports deterministic embedding, transcription, and research results", async () => {
    const gateway = new DeterministicProviderFakes({ scenario: "success" });

    await expect(
      gateway.embed(route, [{ content: "已脱敏", contentHash: "hash", handling: "redacted" }]),
    ).resolves.toMatchObject({ data: [[0.25, 0.5, 0.75]] });
    await expect(
      gateway.transcribe({
        mediaObjectKey: "materials/audio.wav",
        route,
        workspaceId: "workspace",
      }),
    ).resolves.toMatchObject({
      data: { language: "zh-CN", normalizedText: "完全合成的固定转写文本" },
    });
    await expect(gateway.search({ query: "合成查询", route })).resolves.toMatchObject({
      data: { sources: [{ title: "合成来源", url: "https://example.test/source" }] },
    });
  });

  it("keeps prompt and schema versions immutable", () => {
    const registry = new ImmutableAssetRegistry();
    const reference = {
      contentHash: "a".repeat(64),
      id: "extract.insight",
      version: "1.0.0",
    };

    registry.register(reference);
    registry.register(reference);
    expect(registry.get(reference.id, reference.version)).toEqual(reference);
    expect(() => {
      registry.register({ ...reference, contentHash: "b".repeat(64) });
    }).toThrow(InvalidAssetReferenceError);
    expect(() => {
      registry.register({ ...reference, id: "Bad asset" });
    }).toThrow(InvalidAssetReferenceError);
  });
});
