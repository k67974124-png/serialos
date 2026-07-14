import { and, eq } from "drizzle-orm";

import type { SerialOsDatabase } from "./database.js";
import { materialItems, workspaces } from "./schema/foundation.js";
import type { WorkspaceScope } from "./workspace-scope.js";

export interface MaterialSummary {
  readonly id: string;
  readonly title: string;
  readonly version: number;
}

export class OptimisticConcurrencyError extends Error {
  public constructor() {
    super("The editable resource version changed");
    this.name = "OptimisticConcurrencyError";
  }
}

export class WorkspaceRepository {
  readonly #database: SerialOsDatabase;

  public constructor(database: SerialOsDatabase) {
    this.#database = database;
  }

  public async findMaterialById(scope: WorkspaceScope, materialId: string): Promise<MaterialSummary | undefined> {
    const [material] = await this.#database
      .select({ id: materialItems.id, title: materialItems.title, version: materialItems.version })
      .from(materialItems)
      .where(and(eq(materialItems.workspaceId, scope.workspaceId), eq(materialItems.id, materialId)))
      .limit(1);
    return material;
  }

  public async renameWorkspace(scope: WorkspaceScope, expectedVersion: number, name: string): Promise<number> {
    const [updated] = await this.#database
      .update(workspaces)
      .set({ name, updatedAt: new Date(), version: expectedVersion + 1 })
      .where(and(eq(workspaces.id, scope.workspaceId), eq(workspaces.version, expectedVersion)))
      .returning({ version: workspaces.version });
    if (updated === undefined) {
      throw new OptimisticConcurrencyError();
    }
    return updated.version;
  }
}
