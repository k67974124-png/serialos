import type { Mailer, MailMessage, MailReceipt } from "@serialos/application";
import type { WorkspaceId } from "@serialos/domain";
import {
  ObjectNotFoundError,
  workspaceObjectKey,
  type ObjectMetadata,
  type ObjectStorage,
  type PutObjectInput,
  type SignedObjectUrl,
  type StoredObject,
} from "@serialos/storage";

import { SequenceIdGenerator } from "./sequence-id-generator.js";

export class FakeMailer implements Mailer {
  readonly #ids: SequenceIdGenerator;
  public readonly sent: MailMessage[] = [];

  public constructor(messageIds: readonly string[]) {
    this.#ids = new SequenceIdGenerator(messageIds);
  }

  public send(message: MailMessage, signal?: AbortSignal): Promise<MailReceipt> {
    if (signal?.aborted === true) {
      return Promise.reject(new DOMException("Mail send canceled", "AbortError"));
    }
    this.sent.push(Object.freeze({ ...message }));
    return Promise.resolve({ messageId: this.#ids.generate() });
  }
}

interface FakeStoredValue {
  readonly body: Uint8Array;
  readonly contentType: string;
  readonly etag: string;
}

export class FakeObjectStorage implements ObjectStorage {
  readonly #objects = new Map<string, FakeStoredValue>();

  public delete(workspaceId: WorkspaceId, key: string): Promise<void> {
    this.#objects.delete(workspaceObjectKey(workspaceId, key));
    return Promise.resolve();
  }

  public get(workspaceId: WorkspaceId, key: string): Promise<StoredObject> {
    const value = this.#objects.get(workspaceObjectKey(workspaceId, key));
    if (value === undefined) {
      return Promise.reject(new ObjectNotFoundError());
    }
    return Promise.resolve({
      body: new Uint8Array(value.body),
      contentLength: value.body.byteLength,
      contentType: value.contentType,
      etag: value.etag,
    });
  }

  public head(workspaceId: WorkspaceId, key: string): Promise<ObjectMetadata | undefined> {
    const value = this.#objects.get(workspaceObjectKey(workspaceId, key));
    return Promise.resolve(
      value === undefined
        ? undefined
        : {
            contentLength: value.body.byteLength,
            contentType: value.contentType,
            etag: value.etag,
          },
    );
  }

  public put(input: PutObjectInput): Promise<ObjectMetadata> {
    const scopedKey = workspaceObjectKey(input.workspaceId, input.key);
    const value = {
      body: new Uint8Array(input.body),
      contentType: input.contentType,
      etag: `fake-etag-${String(input.body.byteLength)}`,
    };
    this.#objects.set(scopedKey, value);
    return Promise.resolve({
      contentLength: value.body.byteLength,
      contentType: value.contentType,
      etag: value.etag,
    });
  }

  public signRead(
    workspaceId: WorkspaceId,
    key: string,
    ttlSeconds: number,
  ): Promise<SignedObjectUrl> {
    if (!Number.isInteger(ttlSeconds) || ttlSeconds < 1 || ttlSeconds > 900) {
      return Promise.reject(new RangeError("Signed URL TTL must be between 1 and 900 seconds"));
    }
    const scopedKey = workspaceObjectKey(workspaceId, key);
    if (!this.#objects.has(scopedKey)) {
      return Promise.reject(new ObjectNotFoundError());
    }
    return Promise.resolve({
      expiresAt: new Date("2026-07-13T00:05:00.000Z"),
      url: `https://objects.example.test/private/${encodeURIComponent(scopedKey)}?signature=synthetic`,
    });
  }
}
