import { describe, expect, it } from "vitest";

import { ConfigurationError, parseRuntimeConfig } from "./runtime-config.js";

const validDevelopmentEnvironment = {
  APP_URL: "http://127.0.0.1:3000",
  DATABASE_URL: "postgresql://serialos:local@127.0.0.1:55431/serialos",
  NODE_ENV: "development",
  S3_ACCESS_KEY_ID: "minio",
  S3_BUCKET: "serialos-dev",
  S3_ENDPOINT: "http://127.0.0.1:59010",
  S3_FORCE_PATH_STYLE: "true",
  S3_REGION: "us-east-1",
  S3_SECRET_ACCESS_KEY: "local-only-secret",
} as const;

describe("runtime configuration", () => {
  it("parses an isolated development configuration", () => {
    const config = parseRuntimeConfig(validDevelopmentEnvironment);

    expect(config.environment).toBe("development");
    expect(config.objectStorage.bucket).toBe("serialos-dev");
    expect(config.aiBudget).toEqual({
      hardMicrosUsd: 8_000_000n,
      maxInputTokens: 350_000,
      maxOutputTokens: 50_000,
      maxRetriesPerStep: 3,
      maxWebSearchCalls: 8,
      softMicrosUsd: 3_000_000n,
    });
  });

  it("fails at the boundary without printing secret values", () => {
    const secretSentinel = "SECRET_SENTINEL_DO_NOT_PRINT";

    let capturedError: unknown;
    try {
      parseRuntimeConfig({
        ...validDevelopmentEnvironment,
        S3_SECRET_ACCESS_KEY: secretSentinel,
        S3_ENDPOINT: "not-a-url",
      });
    } catch (error: unknown) {
      capturedError = error;
    }

    expect(capturedError).toBeInstanceOf(ConfigurationError);
    expect(String(capturedError)).toContain("S3_ENDPOINT");
    expect(JSON.stringify(capturedError)).not.toContain(secretSentinel);
  });

  it("rejects a test process that points at development resources", () => {
    expect(() => parseRuntimeConfig({ ...validDevelopmentEnvironment, NODE_ENV: "test" })).toThrow(
      ConfigurationError,
    );
  });

  it("rejects a hard AI budget below the configured soft budget", () => {
    expect(() =>
      parseRuntimeConfig({
        ...validDevelopmentEnvironment,
        AI_RUN_HARD_BUDGET_USD: "2.999999",
        AI_RUN_SOFT_BUDGET_USD: "3",
      }),
    ).toThrow(ConfigurationError);
  });
});
