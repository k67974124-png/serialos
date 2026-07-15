import {
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const jobStatus = pgEnum("job_status", [
  "queued",
  "running",
  "retry_scheduled",
  "succeeded",
  "failed",
  "dead_letter",
  "canceled",
]);

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  locale: text("locale").notNull(),
  timezone: text("timezone").notNull(),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull(),
});

export const materialItems = pgTable("material_items", {
  id: uuid("id").primaryKey(),
  workspaceId: uuid("workspace_id").notNull(),
  title: text("title").notNull(),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull(),
});

export const outboxEvents = pgTable("outbox_events", {
  id: uuid("id").primaryKey(),
  workspaceId: uuid("workspace_id").notNull(),
  requestId: uuid("request_id").notNull(),
  traceId: text("trace_id").notNull(),
  eventType: text("event_type").notNull(),
  aggregateType: text("aggregate_type").notNull(),
  aggregateId: uuid("aggregate_id").notNull(),
  aggregateVersion: integer("aggregate_version").notNull(),
  payloadVersion: integer("payload_version").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  occurredAt: timestamp("occurred_at", { mode: "date", withTimezone: true }).notNull(),
  publishedAt: timestamp("published_at", { mode: "date", withTimezone: true }),
  attempts: integer("attempts").notNull(),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey(),
  workspaceId: uuid("workspace_id").notNull(),
  requestId: uuid("request_id").notNull(),
  traceId: text("trace_id").notNull(),
  type: text("type").notNull(),
  dedupeKey: text("dedupe_key"),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  status: jobStatus("status").notNull(),
  priority: integer("priority").notNull(),
  attempt: integer("attempt").notNull(),
  maxAttempts: integer("max_attempts").notNull(),
  availableAt: timestamp("available_at", { mode: "date", withTimezone: true }).notNull(),
  lockedAt: timestamp("locked_at", { mode: "date", withTimezone: true }),
  lockedBy: text("locked_by"),
  heartbeatAt: timestamp("heartbeat_at", { mode: "date", withTimezone: true }),
  progress: numeric("progress", { precision: 5, scale: 4 }).notNull(),
  currentStep: text("current_step"),
  checkpoint: jsonb("checkpoint").$type<Record<string, unknown>>().notNull(),
  cancelRequestedAt: timestamp("cancel_requested_at", { mode: "date", withTimezone: true }),
  deadLetteredAt: timestamp("dead_lettered_at", { mode: "date", withTimezone: true }),
  lastError: jsonb("last_error").$type<Record<string, unknown> | null>(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { mode: "date", withTimezone: true }),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey(),
  workspaceId: uuid("workspace_id"),
  actorUserId: uuid("actor_user_id"),
  actorType: text("actor_type").notNull(),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: uuid("resource_id"),
  beforeSummary: jsonb("before_summary").$type<Record<string, unknown> | null>(),
  afterSummary: jsonb("after_summary").$type<Record<string, unknown> | null>(),
  requestId: text("request_id"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull(),
});

export const foundationSchema = {
  auditLogs,
  jobs,
  materialItems,
  outboxEvents,
  workspaces,
};
