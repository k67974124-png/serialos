export interface TokenUsage {
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
}

export interface ProviderCallMetadata {
  readonly costMicrosUsd: bigint;
  readonly latencyMs: number;
  readonly modelId: string;
  readonly provider: string;
  readonly providerRequestId: string;
  readonly reasoningLevel: string;
  readonly schemaVersion: string;
  readonly status: "succeeded";
  readonly usage: TokenUsage;
}

export class InvalidProviderMetadataError extends Error {
  public constructor() {
    super("Provider metadata failed validation");
    this.name = "InvalidProviderMetadataError";
  }
}

export function assertProviderMetadata(value: unknown): asserts value is ProviderCallMetadata {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new InvalidProviderMetadataError();
  }
  const metadata = value as Record<string, unknown>;
  const usage = metadata.usage;
  if (typeof usage !== "object" || usage === null || Array.isArray(usage)) {
    throw new InvalidProviderMetadataError();
  }
  const tokenUsage = usage as Record<string, unknown>;
  const inputTokens = tokenUsage.inputTokens;
  const outputTokens = tokenUsage.outputTokens;
  const totalTokens = tokenUsage.totalTokens;
  if (
    typeof metadata.costMicrosUsd !== "bigint" ||
    metadata.costMicrosUsd < 0n ||
    typeof metadata.latencyMs !== "number" ||
    !Number.isInteger(metadata.latencyMs) ||
    metadata.latencyMs < 0 ||
    typeof metadata.modelId !== "string" ||
    metadata.modelId.length === 0 ||
    typeof metadata.provider !== "string" ||
    metadata.provider.length === 0 ||
    typeof metadata.providerRequestId !== "string" ||
    metadata.providerRequestId.length === 0 ||
    typeof metadata.reasoningLevel !== "string" ||
    metadata.reasoningLevel.length === 0 ||
    typeof metadata.schemaVersion !== "string" ||
    !/^\d+\.\d+\.\d+$/u.test(metadata.schemaVersion) ||
    metadata.status !== "succeeded" ||
    typeof inputTokens !== "number" ||
    !Number.isInteger(inputTokens) ||
    inputTokens < 0 ||
    typeof outputTokens !== "number" ||
    !Number.isInteger(outputTokens) ||
    outputTokens < 0 ||
    typeof totalTokens !== "number" ||
    totalTokens !== inputTokens + outputTokens
  ) {
    throw new InvalidProviderMetadataError();
  }
}
