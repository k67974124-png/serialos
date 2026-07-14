import pino, { type DestinationStream, type Logger } from "pino";

import { redactLogValue } from "./redaction.js";

export type LogLevel = "debug" | "error" | "info" | "warn";

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
  readonly [key: string]: unknown;
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
    if (typeof redacted !== "object" || redacted === null || Array.isArray(redacted)) {
      throw new TypeError("Structured log fields must remain an object");
    }
    this.#logger[level](redacted, event);
  }
}
