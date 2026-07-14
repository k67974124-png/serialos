import type { ProviderCallMetadata } from "./metadata.js";
import type { ModelRoute } from "./routing.js";

export interface RuntimeSchema<Output> {
  parse(value: unknown): Output;
}

export interface ProviderResult<Output> {
  readonly data: Output;
  readonly metadata: ProviderCallMetadata;
}

export type ProviderFailureKind =
  "canceled" | "metadata_invalid" | "rate_limited" | "schema_invalid" | "server_error" | "timeout";

export class ProviderGatewayError extends Error {
  public readonly kind: ProviderFailureKind;
  public readonly retryAfterMs: number | null;
  public readonly retryable: boolean;

  public constructor(
    kind: ProviderFailureKind,
    options: { readonly retryable: boolean; readonly retryAfterMs?: number },
  ) {
    super(`Provider call failed: ${kind}`);
    this.name = "ProviderGatewayError";
    this.kind = kind;
    this.retryAfterMs = options.retryAfterMs ?? null;
    this.retryable = options.retryable;
  }
}

export interface StructuredAiRequest {
  readonly input: Readonly<Record<string, unknown>>;
  readonly promptId: string;
  readonly promptVersion: string;
  readonly route: ModelRoute;
  readonly schemaId: string;
  readonly schemaVersion: string;
}

export interface AiGateway {
  generate<Output>(
    request: StructuredAiRequest,
    schema: RuntimeSchema<Output>,
    signal?: AbortSignal,
  ): Promise<ProviderResult<Output>>;
}

export interface RedactedEmbeddingInput {
  readonly content: string;
  readonly contentHash: string;
  readonly handling: "redacted";
}

export interface EmbeddingGateway {
  embed(
    route: ModelRoute,
    inputs: readonly RedactedEmbeddingInput[],
    signal?: AbortSignal,
  ): Promise<ProviderResult<readonly (readonly number[])[]>>;
}

export interface TranscriptionRequest {
  readonly mediaObjectKey: string;
  readonly route: ModelRoute;
  readonly workspaceId: string;
}

export interface TranscriptionResult {
  readonly language: string;
  readonly normalizedText: string;
}

export interface TranscriptionGateway {
  transcribe(
    request: TranscriptionRequest,
    signal?: AbortSignal,
  ): Promise<ProviderResult<TranscriptionResult>>;
}

export interface WebResearchRequest {
  readonly query: string;
  readonly route: ModelRoute;
}

export interface WebResearchResult {
  readonly sources: readonly {
    readonly title: string;
    readonly url: string;
  }[];
}

export interface WebResearchGateway {
  search(
    request: WebResearchRequest,
    signal?: AbortSignal,
  ): Promise<ProviderResult<WebResearchResult>>;
}
