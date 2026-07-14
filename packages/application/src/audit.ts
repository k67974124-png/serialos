import type { Clock, IdGenerator } from "./system-ports.js";

export type AuditSummaryValue =
  | boolean
  | null
  | number
  | string
  | readonly AuditSummaryValue[]
  | { readonly [key: string]: AuditSummaryValue };

export type AuditSummary = Readonly<Record<string, AuditSummaryValue>>;

export interface AuditEvent {
  readonly action: string;
  readonly actorType: "system" | "user";
  readonly actorUserId: string | null;
  readonly afterSummary: AuditSummary | null;
  readonly beforeSummary: AuditSummary | null;
  readonly createdAt: Date;
  readonly id: string;
  readonly requestId: string;
  readonly resourceId: string | null;
  readonly resourceType: string;
  readonly workspaceId: string | null;
}

export type NewAuditEvent = Omit<AuditEvent, "createdAt" | "id">;

export interface AppendOnlyAuditWriter {
  append(event: AuditEvent): Promise<void>;
}

const SENSITIVE_SUMMARY_KEYS =
  /(?:answer|authorization|body|content|cookie|email|prompt|secret|text|token)/iu;

function assertSafeSummaryValue(value: AuditSummaryValue, depth: number): void {
  if (depth > 6) {
    throw new RangeError("Audit summary nesting is too deep");
  }
  if (typeof value === "string" && value.length > 500) {
    throw new RangeError("Audit summary string is too long");
  }
  if (Array.isArray(value)) {
    if (value.length > 50) {
      throw new RangeError("Audit summary array is too large");
    }
    for (const item of value as readonly AuditSummaryValue[]) {
      assertSafeSummaryValue(item, depth + 1);
    }
    return;
  }
  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value);
    if (entries.length > 50) {
      throw new RangeError("Audit summary object is too large");
    }
    for (const [key, item] of entries) {
      if (SENSITIVE_SUMMARY_KEYS.test(key)) {
        throw new RangeError("Audit summary contains a sensitive field");
      }
      assertSafeSummaryValue(item, depth + 1);
    }
  }
}

export function assertSafeAuditSummary(summary: AuditSummary | null): void {
  if (summary !== null) {
    assertSafeSummaryValue(summary, 0);
  }
}

export class AuditService {
  readonly #clock: Clock;
  readonly #ids: IdGenerator;
  readonly #writer: AppendOnlyAuditWriter;

  public constructor(writer: AppendOnlyAuditWriter, clock: Clock, ids: IdGenerator) {
    this.#writer = writer;
    this.#clock = clock;
    this.#ids = ids;
  }

  public async record(input: NewAuditEvent): Promise<AuditEvent> {
    if (
      !/^[a-z][a-z0-9_.-]{2,99}$/u.test(input.action) ||
      !/^[a-z][a-z0-9_.-]{1,99}$/u.test(input.resourceType)
    ) {
      throw new RangeError("Audit action or resource type is invalid");
    }
    assertSafeAuditSummary(input.beforeSummary);
    assertSafeAuditSummary(input.afterSummary);
    const event: AuditEvent = {
      ...input,
      createdAt: this.#clock.now(),
      id: this.#ids.generate(),
    };
    await this.#writer.append(event);
    return event;
  }
}
