import pino, { type DestinationStream, type Logger } from "pino";

import { redactLogValue } from "./redaction.js";

export type LogLevel = "debug" | "error" | "info" | "warn";
const STRUCTURED_LOG_FIELD_KEYS = [
  "durationMs",
  "jobId",
  "providerRequestId",
  "requestId",
  "result",
  "traceId",
  "workspaceId",
] as const;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SAFE_IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/u;
const STRUCTURED_LOG_RESULTS = new Set([
  "JOB_HANDLER_FAILED",
  "JOB_TYPE_UNSUPPORTED",
  "QUEUE_OPERATION_FAILED",
  "completed",
  "drained",
  "failed",
  "lease_released",
  "queued",
  "rejected",
  "unsupported",
]);

export interface LogClock {
  now(): Date;
}

export interface StructuredLogFields {
  readonly durationMs?: number;
  readonly jobId?: string;
  readonly providerRequestId?: string;
  readonly requestId?: string;
  readonly result?: string;
  readonly traceId?: string;
  readonly workspaceId?: string;
}

function isSafeStructuredField(
  key: (typeof STRUCTURED_LOG_FIELD_KEYS)[number],
  value: unknown,
): boolean {
  if (key === "durationMs") {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  }
  if (key === "jobId" || key === "requestId" || key === "workspaceId") {
    return typeof value === "string" && UUID_PATTERN.test(value);
  }
  if (key === "result") {
    return typeof value === "string" && STRUCTURED_LOG_RESULTS.has(value);
  }
  return typeof value === "string" && SAFE_IDENTIFIER_PATTERN.test(value);
}

export class StructuredLogger {
  readonly #logger: Logger;

  public constructor(destination: DestinationStream, clock: LogClock, level: LogLevel = "info") {
    this.#logger = pino(
      {
        base: null,
        level,
        messageKey: "event",
        timestamp: () => `,"time":"${clock.now().toISOString()}"`,
      },
      destination,
    );
  }

  public log(level: LogLevel, event: string, fields: StructuredLogFields = {}): void {
    if (!/^[a-z][a-z0-9_.-]{2,99}$/u.test(event)) {
      throw new RangeError("Structured log event name is invalid");
    }
    const redacted = redactLogValue(fields);
    const redactedFields: Readonly<Record<string, unknown>> =
      typeof redacted === "object" && redacted !== null && !Array.isArray(redacted)
        ? (redacted as Readonly<Record<string, unknown>>)
        : { result: "redaction_failed" };
    const safeFields: Record<string, unknown> = {};
    for (const key of STRUCTURED_LOG_FIELD_KEYS) {
      const value = redactedFields[key];
      if (Object.hasOwn(redactedFields, key) && isSafeStructuredField(key, value)) {
        safeFields[key] = value;
      }
    }
    this.#logger[level](safeFields, event);
  }
}
