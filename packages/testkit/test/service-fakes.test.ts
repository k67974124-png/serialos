import { asWorkspaceId } from "@serialos/domain";
import { ObjectNotFoundError } from "@serialos/storage";
import { describe, expect, it } from "vitest";

import { FakeMailer, FakeObjectStorage } from "../src/service-fakes.js";

const workspaceA = asWorkspaceId("00000000-0000-4000-8000-0000000000a1");
const workspaceB = asWorkspaceId("00000000-0000-4000-8000-0000000000b1");

describe("deterministic service fakes", () => {
  it("records mail without requiring an SMTP server and honors cancellation", async () => {
    const mailer = new FakeMailer(["message-1"]);
    const message = {
      from: "noreply@example.test",
      html: "<p>合成验证邮件</p>",
      subject: "验证",
      text: "合成验证邮件",
      to: "creator@example.test",
    };

    await expect(mailer.send(message)).resolves.toEqual({ messageId: "message-1" });
    expect(mailer.sent).toEqual([message]);

    const controller = new AbortController();
    controller.abort();
    await expect(mailer.send(message, controller.signal)).rejects.toMatchObject({
      name: "AbortError",
    });
  });

  it("isolates object keys by workspace and exposes signed private reads", async () => {
    const storage = new FakeObjectStorage();
    const body = new TextEncoder().encode("synthetic-object");

    await expect(
      storage.put({
        body,
        contentType: "text/plain",
        key: "materials/source.txt",
        workspaceId: workspaceA,
      }),
    ).resolves.toMatchObject({ contentLength: body.byteLength, contentType: "text/plain" });
    await expect(storage.head(workspaceB, "materials/source.txt")).resolves.toBeUndefined();
    await expect(storage.get(workspaceA, "materials/source.txt")).resolves.toMatchObject({ body });
    await expect(storage.signRead(workspaceA, "materials/source.txt", 300)).resolves.toMatchObject({
      expiresAt: new Date("2026-07-13T00:05:00.000Z"),
    });
    await expect(storage.signRead(workspaceA, "materials/source.txt", 901)).rejects.toThrow(
      RangeError,
    );

    await storage.delete(workspaceA, "materials/source.txt");
    await expect(storage.get(workspaceA, "materials/source.txt")).rejects.toThrow(
      ObjectNotFoundError,
    );
  });
});
