import { describe, expect, it } from "vitest";

import {
  ApiBoundaryError,
  ContractSchemaValidationError,
  parseIdempotencyKey,
  parseJsonRequest,
  parsePagination,
  requireWorkspaceRequestContext,
  resolveRequestId,
  toApiErrorResponse,
} from "../src/index.js";

const requestId = "00000000-0000-4000-8000-000000000061";

describe("API request boundary", () => {
  it("returns stable validation code, field issues, and request ID", () => {
    let captured: unknown;
    try {
      parseJsonRequest("application/json; charset=utf-8", { title: "raw sentinel" }, {
        parse() {
          throw new ContractSchemaValidationError([
            { field: "/title", keyword: "maxLength", reason: "must NOT exceed 10 characters" },
          ]);
        },
      });
    } catch (error) {
      captured = error;
    }

    expect(toApiErrorResponse(captured, requestId)).toEqual({
      body: {
        error: {
          code: "VALIDATION_ERROR",
          details: {
            issues: [{ field: "/title", reason: "must NOT exceed 10 characters" }],
          },
          message: "请求数据未通过校验。",
          requestId,
          retryable: false,
        },
      },
      status: 400,
    });
  });

  it("rejects unsupported content types before schema parsing", () => {
    expect(() => parseJsonRequest("text/plain", {}, { parse: () => ({}) })).toThrow(
      expect.objectContaining({ code: "CONTENT_TYPE_UNSUPPORTED" }),
    );
  });

  it("fails closed for absent or cross-user workspace context with the same 404 envelope", () => {
    const session = { sessionId: "session", userId: "user-a" };
    const missing = (): unknown => requireWorkspaceRequestContext(requestId, session, undefined);
    const foreign = (): unknown =>
      requireWorkspaceRequestContext(requestId, session, {
        userId: "user-b",
        workspaceId: "workspace-b",
      });

    let missingError: unknown;
    let foreignError: unknown;
    try {
      missing();
    } catch (error) {
      missingError = error;
    }
    try {
      foreign();
    } catch (error) {
      foreignError = error;
    }

    expect(toApiErrorResponse(missingError, requestId)).toEqual(
      toApiErrorResponse(foreignError, requestId),
    );
    expect(toApiErrorResponse(missingError, requestId).status).toBe(404);
  });

  it("provides typed idempotency, pagination, session, and request-ID primitives", () => {
    expect(parseIdempotencyKey("request-0001")).toBe("request-0001");
    expect(parsePagination({ cursor: "next", limit: "50" })).toEqual({ cursor: "next", limit: 50 });
    expect(
      resolveRequestId("untrusted", {
        generate: () => requestId,
      }),
    ).toBe(requestId);
    expect(() => requireWorkspaceRequestContext(requestId, undefined, undefined)).toThrow(
      expect.objectContaining({ code: "SESSION_REQUIRED" }),
    );
  });

  it("never exposes stack, SQL, secret, or raw input from internal failures", () => {
    const secret = "SECRET_SENTINEL";
    const internal = new Error(`SELECT * FROM private_data; ${secret}; raw creator input`);
    internal.stack = `stack ${secret}`;

    const response = toApiErrorResponse(internal, requestId);
    const serialized = JSON.stringify(response);
    expect(response.status).toBe(500);
    expect(response.body.error.code).toBe("INTERNAL_ERROR");
    expect(serialized).not.toContain(secret);
    expect(serialized).not.toContain("SELECT");
    expect(serialized).not.toContain("raw creator input");
    expect(serialized).not.toContain("stack");
  });

  it("does not let generic application errors choose public codes", () => {
    expect(toApiErrorResponse(new ApiBoundaryError("RESOURCE_NOT_FOUND"), requestId).status).toBe(404);
    expect(toApiErrorResponse(new Error("RESOURCE_NOT_FOUND"), requestId).status).toBe(500);
  });
});
