import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { WorkspaceId } from "@serialos/domain";

import {
  ObjectNotFoundError,
  type ObjectMetadata,
  type ObjectStorage,
  type PutObjectInput,
  type SignedObjectUrl,
  type StoredObject,
} from "./object-storage.js";
import { workspaceObjectKey } from "./object-key.js";
import type { S3HealthOptions } from "./s3-health.js";

export class S3ObjectStorage implements ObjectStorage {
  readonly #bucket: string;
  readonly #client: S3Client;

  public constructor(options: S3HealthOptions) {
    this.#bucket = options.bucket;
    this.#client = new S3Client({
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      endpoint: options.endpoint,
      forcePathStyle: options.forcePathStyle,
      region: options.region,
    });
  }

  public async put(input: PutObjectInput): Promise<ObjectMetadata> {
    if (input.body.byteLength === 0 || input.contentType.length === 0) {
      throw new RangeError("Stored objects require non-empty bytes and content type");
    }
    const response = await this.#client.send(
      new PutObjectCommand({
        Body: input.body,
        Bucket: this.#bucket,
        ContentLength: input.body.byteLength,
        ContentType: input.contentType,
        Key: workspaceObjectKey(input.workspaceId, input.key),
      }),
    );
    return {
      contentLength: input.body.byteLength,
      contentType: input.contentType,
      etag: response.ETag ?? null,
    };
  }

  public async head(workspaceId: WorkspaceId, key: string): Promise<ObjectMetadata | undefined> {
    try {
      const response = await this.#client.send(
        new HeadObjectCommand({ Bucket: this.#bucket, Key: workspaceObjectKey(workspaceId, key) }),
      );
      return {
        contentLength: response.ContentLength ?? 0,
        contentType: response.ContentType ?? "application/octet-stream",
        etag: response.ETag ?? null,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === "NotFound" || error.name === "NoSuchKey" || error.name === "NoSuchBucket")
      ) {
        return undefined;
      }
      throw error;
    }
  }

  public async get(workspaceId: WorkspaceId, key: string): Promise<StoredObject> {
    try {
      const response = await this.#client.send(
        new GetObjectCommand({ Bucket: this.#bucket, Key: workspaceObjectKey(workspaceId, key) }),
      );
      if (response.Body === undefined) {
        throw new ObjectNotFoundError();
      }
      const body = await response.Body.transformToByteArray();
      return {
        body,
        contentLength: response.ContentLength ?? body.byteLength,
        contentType: response.ContentType ?? "application/octet-stream",
        etag: response.ETag ?? null,
      };
    } catch (error) {
      if (error instanceof Error && (error.name === "NoSuchKey" || error.name === "NotFound")) {
        throw new ObjectNotFoundError();
      }
      throw error;
    }
  }

  public async delete(workspaceId: WorkspaceId, key: string): Promise<void> {
    await this.#client.send(
      new DeleteObjectCommand({ Bucket: this.#bucket, Key: workspaceObjectKey(workspaceId, key) }),
    );
  }

  public async signRead(
    workspaceId: WorkspaceId,
    key: string,
    ttlSeconds: number,
  ): Promise<SignedObjectUrl> {
    if (!Number.isInteger(ttlSeconds) || ttlSeconds < 1 || ttlSeconds > 900) {
      throw new RangeError("Signed URL TTL must be between 1 and 900 seconds");
    }
    const expiresAt = new Date(Date.now() + ttlSeconds * 1_000);
    const url = await getSignedUrl(
      this.#client,
      new GetObjectCommand({ Bucket: this.#bucket, Key: workspaceObjectKey(workspaceId, key) }),
      { expiresIn: ttlSeconds },
    );
    return { expiresAt, url };
  }

  public destroy(): void {
    this.#client.destroy();
  }
}
