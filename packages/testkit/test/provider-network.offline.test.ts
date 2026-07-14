import { describe, expect, it } from "vitest";

import {
  DenyAllProviderTransport,
  DeterministicProviderFakes,
  PublicNetworkAccessDeniedError,
} from "../src/provider-fakes.js";

describe("offline provider guard", () => {
  it("denies public provider transport by default", async () => {
    const transport = new DenyAllProviderTransport();

    await expect(
      transport.request(new URL("https://api.example-provider.test/v1")),
    ).rejects.toThrow(PublicNetworkAccessDeniedError);
  });

  it("uses deterministic providers without credentials or network", async () => {
    const provider = new DeterministicProviderFakes({
      scenario: "success",
      structuredFixture: { safe: true },
    });

    await expect(
      provider.generate(
        {
          input: {},
          promptId: "fixture.prompt",
          promptVersion: "1.0.0",
          route: {
            modelId: "fixture-model",
            pricing: {
              inputMicrosUsdPerMillionTokens: 0n,
              outputMicrosUsdPerMillionTokens: 0n,
            },
            provider: "fixture-provider",
            reasoningLevel: "fixture",
          },
          schemaId: "fixture.output",
          schemaVersion: "1.0.0",
        },
        {
          parse(value) {
            return value;
          },
        },
      ),
    ).resolves.toMatchObject({ data: { safe: true } });
  });
});
