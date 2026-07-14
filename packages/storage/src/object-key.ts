import type { WorkspaceId } from "@serialos/domain";

export class InvalidObjectKeyError extends Error {
  public constructor() {
    super("Object keys must remain inside the active workspace prefix");
    this.name = "InvalidObjectKeyError";
  }
}

export function workspaceObjectKey(workspaceId: WorkspaceId, suffix: string): string {
  const normalizedSuffix = suffix.replaceAll("\\", "/");
  if (
    normalizedSuffix.startsWith("/") ||
    normalizedSuffix.includes("../") ||
    normalizedSuffix === ".." ||
    normalizedSuffix.length === 0
  ) {
    throw new InvalidObjectKeyError();
  }

  return `workspaces/${String(workspaceId)}/${normalizedSuffix}`;
}
