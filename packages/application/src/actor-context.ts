import type { RequestId, WorkspaceId } from "@serialos/domain";

export interface ActorContext {
  readonly actorId: string | null;
  readonly actorType: "system" | "user";
  readonly requestId: RequestId;
  readonly workspaceId: WorkspaceId;
}

export class MissingWorkspaceContextError extends Error {
  public constructor() {
    super("A trusted workspace context is required");
    this.name = "MissingWorkspaceContextError";
  }
}

export function requireWorkspaceContext(context: ActorContext | null | undefined): ActorContext {
  if (context === null || context === undefined) {
    throw new MissingWorkspaceContextError();
  }

  return context;
}
