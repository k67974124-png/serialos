import { asWorkspaceId } from "@serialos/domain";
import { afterAll, describe, expect, it } from "vitest";

import { S3ObjectStorage } from "../src/s3-object-storage.js";

const storage = new S3ObjectStorage({
  accessKeyId: process.env.TEST_S3_ACCESS_KEY_ID ?? "minio-test",
  bucket: process.env.TEST_S3_BUCKET ?? "serialos-test",
  endpoint: process.env.TEST_S3_ENDPOINT ?? "http://127.0.0.1:59000",
  forcePathStyle: true,
  region: "us-east-1",
  secretAccessKey: process.env.TEST_S3_SECRET_ACCESS_KEY ?? "serialos-minio-test-only",
});

const workspaceA = asWorkspaceId("00000000-0000-4000-8000-0000000000a5");
const workspaceB = asWorkspaceId("00000000-0000-4000-8000-0000000000b5");
const key = "e00-s05/private-fixture.txt";

afterAll(async () => {
  await storage.delete(workspaceA, key);
  storage.destroy();
});

describe("S3 object storage adapter", () => {
  it("stores private workspace-scoped objects and signs short-lived reads", async () => {
    const body = new TextEncoder().encode("synthetic MinIO fixture");

    await expect(
      storage.put({ body, contentType: "text/plain", key, workspaceId: workspaceA }),
    ).resolves.toMatchObject({ contentLength: body.byteLength, contentType: "text/plain" });
    await expect(storage.head(workspaceB, key)).resolves.toBeUndefined();
    await expect(storage.get(workspaceA, key)).resolves.toMatchObject({
      body,
      contentLength: body.byteLength,
      contentType: "text/plain",
    });

    const signed = await storage.signRead(workspaceA, key, 60);
    expect(signed.url).toContain("X-Amz-Signature=");
    expect(signed.expiresAt.getTime()).toBeGreaterThan(Date.now());

    await storage.delete(workspaceA, key);
    await expect(storage.head(workspaceA, key)).resolves.toBeUndefined();
  });
});
