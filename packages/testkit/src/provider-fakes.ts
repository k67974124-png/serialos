import {
  InvalidProviderMetadataError,
  ProviderGatewayError,
  assertProviderMetadata,
  type AiGateway,
  type EmbeddingGateway,
  type ModelRoute,
  type ProviderCallMetadata,
  type ProviderResult,
  type RuntimeSchema,
  type StructuredAiRequest,
  type TranscriptionGateway,
  type TranscriptionRequest,
  type TranscriptionResult,
  type WebResearchGateway,
  type WebResearchRequest,
  type WebResearchResult,
} from "@serialos/ai";

export type FakeProviderScenario =
  | "canceled"
  | "metadata_invalid"
  | "rate_limited"
  | "schema_invalid"
  | "server_error"
  | "success"
  | "timeout";

export interface DeterministicProviderFakeOptions {
  readonly scenario: FakeProviderScenario;
  readonly structuredFixture?: unknown;
}

function providerFailure(scenario: Exclude<FakeProviderScenario, "success">): ProviderGatewayError {
  switch (scenario) {
    case "canceled":
      return new ProviderGatewayError("canceled", { retryable: false });
    case "metadata_invalid":
      return new ProviderGatewayError("metadata_invalid", { retryable: false });
    case "rate_limited":
      return new ProviderGatewayError("rate_limited", { retryAfterMs: 1_000, retryable: true });
    case "schema_invalid":
      return new ProviderGatewayError("schema_invalid", { retryable: false });
    case "server_error":
      return new ProviderGatewayError("server_error", { retryable: true });
    case "timeout":
      return new ProviderGatewayError("timeout", { retryable: true });
  }
}

export class DeterministicProviderFakes
  implements AiGateway, EmbeddingGateway, TranscriptionGateway, WebResearchGateway
{
  readonly #scenario: FakeProviderScenario;
  readonly #structuredFixture: unknown;

  public constructor(options: DeterministicProviderFakeOptions) {
    this.#scenario = options.scenario;
    this.#structuredFixture = options.structuredFixture ?? { fixture: "deterministic" };
  }

  #metadata(route: ModelRoute, schemaVersion: string): ProviderCallMetadata {
    const metadata: ProviderCallMetadata = {
      costMicrosUsd: 125n,
      latencyMs: 25,
      modelId: route.modelId,
      provider: route.provider,
      providerRequestId: this.#scenario === "metadata_invalid" ? "" : "fake-provider-request-1",
      reasoningLevel: route.reasoningLevel,
      schemaVersion,
      status: "succeeded",
      usage: { inputTokens: 10, outputTokens: 5, totalTokens: 15 },
    };
    try {
      assertProviderMetadata(metadata);
    } catch (error) {
      if (error instanceof InvalidProviderMetadataError) {
        throw providerFailure("metadata_invalid");
      }
      throw error;
    }
    return metadata;
  }

  #preflight(signal: AbortSignal | undefined): void {
    if (signal?.aborted === true || this.#scenario === "canceled") {
      throw providerFailure("canceled");
    }
    if (
      this.#scenario === "rate_limited" ||
      this.#scenario === "server_error" ||
      this.#scenario === "timeout"
    ) {
      throw providerFailure(this.#scenario);
    }
  }

  public async generate<Output>(
    request: StructuredAiRequest,
    schema: RuntimeSchema<Output>,
    signal?: AbortSignal,
  ): Promise<ProviderResult<Output>> {
    await Promise.resolve();
    this.#preflight(signal);
    const metadata = this.#metadata(request.route, request.schemaVersion);
    try {
      const data = schema.parse(
        this.#scenario === "schema_invalid" ? { invalidFixture: true } : this.#structuredFixture,
      );
      if (this.#scenario === "schema_invalid") {
        throw providerFailure("schema_invalid");
      }
      return { data, metadata };
    } catch (error) {
      if (error instanceof ProviderGatewayError) {
        throw error;
      }
      throw providerFailure("schema_invalid");
    }
  }

  public async embed(
    route: ModelRoute,
    _inputs: readonly {
      readonly content: string;
      readonly contentHash: string;
      readonly handling: "redacted";
    }[],
    signal?: AbortSignal,
  ): Promise<ProviderResult<readonly (readonly number[])[]>> {
    await Promise.resolve();
    this.#preflight(signal);
    if (this.#scenario === "schema_invalid") {
      throw providerFailure("schema_invalid");
    }
    return { data: [[0.25, 0.5, 0.75]], metadata: this.#metadata(route, "1.0.0") };
  }

  public async transcribe(
    request: TranscriptionRequest,
    signal?: AbortSignal,
  ): Promise<ProviderResult<TranscriptionResult>> {
    await Promise.resolve();
    this.#preflight(signal);
    if (this.#scenario === "schema_invalid") {
      throw providerFailure("schema_invalid");
    }
    return {
      data: { language: "zh-CN", normalizedText: "完全合成的固定转写文本" },
      metadata: this.#metadata(request.route, "1.0.0"),
    };
  }

  public async search(
    request: WebResearchRequest,
    signal?: AbortSignal,
  ): Promise<ProviderResult<WebResearchResult>> {
    await Promise.resolve();
    this.#preflight(signal);
    if (this.#scenario === "schema_invalid") {
      throw providerFailure("schema_invalid");
    }
    return {
      data: { sources: [{ title: "合成来源", url: "https://example.test/source" }] },
      metadata: this.#metadata(request.route, "1.0.0"),
    };
  }
}

export class PublicNetworkAccessDeniedError extends Error {
  public constructor() {
    super("Provider network access is disabled in offline tests");
    this.name = "PublicNetworkAccessDeniedError";
  }
}

export class DenyAllProviderTransport {
  public request(url: URL, signal?: AbortSignal): Promise<never> {
    void url;
    void signal;
    return Promise.reject(new PublicNetworkAccessDeniedError());
  }
}
