import type { AppendOnlyAuditWriter, AuditEvent } from "@serialos/application";

import type { SerialOsDatabase } from "./database.js";
import { auditLogs } from "./schema/foundation.js";

export class PostgresAuditWriter implements AppendOnlyAuditWriter {
  readonly #database: SerialOsDatabase;

  public constructor(database: SerialOsDatabase) {
    this.#database = database;
  }

  public async append(event: AuditEvent): Promise<void> {
    await this.#database.insert(auditLogs).values({
      action: event.action,
      actorType: event.actorType,
      actorUserId: event.actorUserId,
      afterSummary: event.afterSummary,
      beforeSummary: event.beforeSummary,
      createdAt: event.createdAt,
      id: event.id,
      requestId: event.requestId,
      resourceId: event.resourceId,
      resourceType: event.resourceType,
      workspaceId: event.workspaceId,
    });
  }
}
