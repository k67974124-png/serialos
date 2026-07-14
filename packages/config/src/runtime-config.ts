import { z } from "zod";

const booleanString = z.enum(["true", "false"]).transform((value) => value === "true");

const usdString = z
  .string()
  .regex(/^\d+(?:\.\d{1,6})?$/u)
  .transform((value) => {
    const [whole = "0", fraction = ""] = value.split(".");
    return BigInt(whole) * 1_000_000n + BigInt(fraction.padEnd(6, "0"));
  });

const runtimeConfigSchema = z
  .object({
    APP_URL: z.url(),
    AI_MAX_INPUT_TOKENS: z.coerce.number().int().min(1).default(350_000),
    AI_MAX_OUTPUT_TOKENS: z.coerce.number().int().min(1).default(50_000),
    AI_MAX_RETRIES_PER_STEP: z.coerce.number().int().min(0).max(20).default(3),
    AI_MAX_WEB_SEARCH_CALLS: z.coerce.number().int().min(0).max(100).default(8),
    AI_RUN_HARD_BUDGET_USD: usdString.default(8_000_000n),
    AI_RUN_SOFT_BUDGET_USD: usdString.default(3_000_000n),
    DATABASE_URL: z.string().min(1),
    JOB_DRAIN_TIMEOUT_SECONDS: z.coerce.number().int().min(1).max(300).default(30),
    JOB_LOCK_SECONDS: z.coerce.number().int().min(30).max(3_600).default(900),
    JOB_MAX_ATTEMPTS: z.coerce.number().int().min(1).max(100).default(5),
    JOB_WORKER_CONCURRENCY: z.coerce.number().int().min(1).max(64).default(4),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
    NODE_ENV: z.enum(["development", "test", "production"]),
    S3_ACCESS_KEY_ID: z.string().min(1),
    S3_BUCKET: z.string().regex(/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/u),
    S3_ENDPOINT: z.url(),
    S3_FORCE_PATH_STYLE: booleanString.default(true),
    S3_REGION: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(8),
    WEB_PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
    WORKER_HEALTH_HOST: z.string().min(1).default("127.0.0.1"),
    WORKER_HEALTH_PORT: z.coerce.number().int().min(1).max(65_535).default(3001),
  })
  .superRefine((value, context) => {
    const isTestDatabase = /(?:_|-)test(?:$|[?&#])/u.test(value.DATABASE_URL);
    const isTestBucket = /(?:_|-)test$/u.test(value.S3_BUCKET);

    if (value.NODE_ENV === "test" && !isTestDatabase) {
      context.addIssue({
        code: "custom",
        message: "must identify an isolated test database",
        path: ["DATABASE_URL"],
      });
    }
    if (value.NODE_ENV === "test" && !isTestBucket) {
      context.addIssue({
        code: "custom",
        message: "must identify an isolated test bucket",
        path: ["S3_BUCKET"],
      });
    }
    if (value.NODE_ENV === "development" && (isTestDatabase || isTestBucket)) {
      context.addIssue({
        code: "custom",
        message: "development resources must not reuse test resources",
        path: ["NODE_ENV"],
      });
    }
    if (value.AI_RUN_HARD_BUDGET_USD < value.AI_RUN_SOFT_BUDGET_USD) {
      context.addIssue({
        code: "custom",
        message: "hard budget must be greater than or equal to soft budget",
        path: ["AI_RUN_HARD_BUDGET_USD"],
      });
    }
  });

type ParsedRuntimeConfig = z.infer<typeof runtimeConfigSchema>;

export interface RuntimeConfig {
  readonly aiBudget: {
    readonly hardMicrosUsd: bigint;
    readonly maxInputTokens: number;
    readonly maxOutputTokens: number;
    readonly maxRetriesPerStep: number;
    readonly maxWebSearchCalls: number;
    readonly softMicrosUsd: bigint;
  };
  readonly appUrl: string;
  readonly databaseUrl: string;
  readonly environment: ParsedRuntimeConfig["NODE_ENV"];
  readonly jobs: {
    readonly concurrency: number;
    readonly drainTimeoutMs: number;
    readonly leaseDurationMs: number;
    readonly maxAttempts: number;
  };
  readonly logLevel: ParsedRuntimeConfig["LOG_LEVEL"];
  readonly objectStorage: {
    readonly accessKeyId: string;
    readonly bucket: string;
    readonly endpoint: string;
    readonly forcePathStyle: boolean;
    readonly region: string;
    readonly secretAccessKey: string;
  };
  readonly webPort: number;
  readonly workerHealthHost: string;
  readonly workerHealthPort: number;
}

export interface ConfigurationIssue {
  readonly name: string;
  readonly reason: string;
}

export class ConfigurationError extends Error {
  public readonly issues: readonly ConfigurationIssue[];

  public constructor(issues: readonly ConfigurationIssue[]) {
    super(`Invalid configuration: ${issues.map((issue) => issue.name).join(", ")}`);
    this.name = "ConfigurationError";
    this.issues = issues;
  }
}

export function parseRuntimeConfig(environment: Record<string, string | undefined>): RuntimeConfig {
  const result = runtimeConfigSchema.safeParse(environment);
  if (!result.success) {
    throw new ConfigurationError(
      result.error.issues.map((issue) => ({
        name: issue.path.join(".") || "environment",
        reason: issue.message,
      })),
    );
  }

  const value = result.data;
  return {
    aiBudget: {
      hardMicrosUsd: value.AI_RUN_HARD_BUDGET_USD,
      maxInputTokens: value.AI_MAX_INPUT_TOKENS,
      maxOutputTokens: value.AI_MAX_OUTPUT_TOKENS,
      maxRetriesPerStep: value.AI_MAX_RETRIES_PER_STEP,
      maxWebSearchCalls: value.AI_MAX_WEB_SEARCH_CALLS,
      softMicrosUsd: value.AI_RUN_SOFT_BUDGET_USD,
    },
    appUrl: value.APP_URL,
    databaseUrl: value.DATABASE_URL,
    environment: value.NODE_ENV,
    jobs: {
      concurrency: value.JOB_WORKER_CONCURRENCY,
      drainTimeoutMs: value.JOB_DRAIN_TIMEOUT_SECONDS * 1_000,
      leaseDurationMs: value.JOB_LOCK_SECONDS * 1_000,
      maxAttempts: value.JOB_MAX_ATTEMPTS,
    },
    logLevel: value.LOG_LEVEL,
    objectStorage: {
      accessKeyId: value.S3_ACCESS_KEY_ID,
      bucket: value.S3_BUCKET,
      endpoint: value.S3_ENDPOINT,
      forcePathStyle: value.S3_FORCE_PATH_STYLE,
      region: value.S3_REGION,
      secretAccessKey: value.S3_SECRET_ACCESS_KEY,
    },
    webPort: value.WEB_PORT,
    workerHealthHost: value.WORKER_HEALTH_HOST,
    workerHealthPort: value.WORKER_HEALTH_PORT,
  };
}
