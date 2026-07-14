import type { WorkspaceId } from "@serialos/domain";

export interface ObjectMetadata {
  readonly contentLength: number;
  readonly contentType: string;
  readonly etag: string | null;
}

export interface PutObjectInput {
  readonly body: Uint8Array;
  readonly contentType: string;
  readonly key: string;
  readonly workspaceId: WorkspaceId;
}

export interface StoredObject extends ObjectMetadata {
  readonly body: Uint8Array;
}

export interface SignedObjectUrl {
  readonly expiresAt: Date;
  readonly url: string;
}

export class ObjectNotFoundError extends Error {
  public constructor() {
    super("The scoped object does not exist");
    this.name = "ObjectNotFoundError";
  }
}

export interface ObjectStorage {
  delete(workspaceId: WorkspaceId, key: string): Promise<void>;
  get(workspaceId: WorkspaceId, key: string): Promise<StoredObject>;
  head(workspaceId: WorkspaceId, key: string): Promise<ObjectMetadata | undefined>;
  put(input: PutObjectInput): Promise<ObjectMetadata>;
  signRead(workspaceId: WorkspaceId, key: string, ttlSeconds: number): Promise<SignedObjectUrl>;
}
