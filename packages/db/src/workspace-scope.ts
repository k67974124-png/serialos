import type { WorkspaceId } from "@serialos/domain";

export class MissingWorkspaceScopeError extends Error {
  public constructor() {
    super("A workspace scope is required for workspace-owned data");
    this.name = "MissingWorkspaceScopeError";
  }
}

export interface WorkspaceScope {
  readonly workspaceId: WorkspaceId;
}

export function createWorkspaceScope(workspaceId: WorkspaceId | null | undefined): WorkspaceScope {
  if (workspaceId === null || workspaceId === undefined) {
    throw new MissingWorkspaceScopeError();
  }
  return { workspaceId };
}
