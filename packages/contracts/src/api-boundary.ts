import type { ErrorEnvelope } from "./generated/openapi/types.gen.js";
import {
  ContractSchemaValidationError,
  type ContractValidationIssue,
} from "./schema-registry.js";

export type ApiErrorCode =
  | "CONTENT_TYPE_UNSUPPORTED"
  | "IDEMPOTENCY_KEY_INVALID"
  | "INTERNAL_ERROR"
  | "PAGINATION_INVALID"
  | "RESOURCE_NOT_FOUND"
  | "SESSION_REQUIRED"
  | "VALIDATION_ERROR";

const ERROR_POLICY: Readonly<
  Record<ApiErrorCode, { readonly message: string; readonly retryable: boolean; readonly status: number }>
> = {
  CONTENT_TYPE_UNSUPPORTED: { message: "请求内容类型不受支持。", retryable: false, status: 415 },
  IDEMPOTENCY_KEY_INVALID: { message: "幂等键格式无效。", retryable: false, status: 400 },
  INTERNAL_ERROR: { message: "服务暂时无法完成请求。", retryable: true, status: 500 },
  PAGINATION_INVALID: { message: "分页参数无效。", retryable: false, status: 400 },
  RESOURCE_NOT_FOUND: { message: "未找到该资源。", retryable: false, status: 404 },
  SESSION_REQUIRED: { message: "请先登录。", retryable: false, status: 401 },
  VALIDATION_ERROR: { message: "请求数据未通过校验。", retryable: false, status: 400 },
};

export class ApiBoundaryError extends Error {
  public readonly code: ApiErrorCode;
  public readonly issues: readonly ContractValidationIssue[];

  public constructor(code: ApiErrorCode, issues: readonly ContractValidationIssue[] = []) {
    super(code);
    this.name = "ApiBoundaryError";
    this.code = code;
    this.issues = issues;
  }
}

export interface ApiErrorResponse {
  readonly body: ErrorEnvelope;
  readonly status: number;
}

export interface RuntimeRequestSchema<Output> {
  parse(value: unknown): Output;
}

export interface SessionContext {
  readonly sessionId: string;
  readonly userId: string;
}

export interface WorkspaceContext {
  readonly userId: string;
  readonly workspaceId: string;
}

export interface WorkspaceRequestContext {
  readonly requestId: string;
  readonly session: SessionContext;
  readonly workspace: WorkspaceContext;
}

export interface Pagination {
  readonly cursor: string | null;
  readonly limit: number;
}

export interface RequestIdGenerator {
  generate(): string;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export function resolveRequestId(
  suppliedRequestId: string | null | undefined,
  generator: RequestIdGenerator,
): string {
  if (suppliedRequestId !== null && suppliedRequestId !== undefined && UUID_PATTERN.test(suppliedRequestId)) {
    return suppliedRequestId;
  }
  const generated = generator.generate();
  if (!UUID_PATTERN.test(generated)) {
    throw new TypeError("Request ID generator returned a non-UUID value");
  }
  return generated;
}

export function parseJsonRequest<Output>(
  contentType: string | null | undefined,
  body: unknown,
  schema: RuntimeRequestSchema<Output>,
): Output {
  if (contentType === null || contentType === undefined || !/^application\/json(?:\s*;|$)/iu.test(contentType)) {
    throw new ApiBoundaryError("CONTENT_TYPE_UNSUPPORTED");
  }
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ContractSchemaValidationError) {
      throw new ApiBoundaryError("VALIDATION_ERROR", error.issues);
    }
    if (error instanceof ApiBoundaryError) {
      throw error;
    }
    throw new ApiBoundaryError("VALIDATION_ERROR");
  }
}

export function requireWorkspaceRequestContext(
  requestId: string,
  session: SessionContext | null | undefined,
  workspace: WorkspaceContext | null | undefined,
): WorkspaceRequestContext {
  if (session === null || session === undefined) {
    throw new ApiBoundaryError("SESSION_REQUIRED");
  }
  if (workspace === null || workspace === undefined || workspace.userId !== session.userId) {
    throw new ApiBoundaryError("RESOURCE_NOT_FOUND");
  }
  return { requestId, session, workspace };
}

export function parseIdempotencyKey(value: string | null | undefined): string {
  if (value === null || value === undefined || value.length < 8 || value.length > 200) {
    throw new ApiBoundaryError("IDEMPOTENCY_KEY_INVALID");
  }
  return value;
}

export function parsePagination(input: {
  readonly cursor?: string | null;
  readonly limit?: string | null;
}): Pagination {
  const limit = input.limit === null || input.limit === undefined ? 30 : Number(input.limit);
  const cursor = input.cursor ?? null;
  if (!Number.isInteger(limit) || limit < 1 || limit > 100 || (cursor !== null && cursor.length > 2_048)) {
    throw new ApiBoundaryError("PAGINATION_INVALID");
  }
  return { cursor, limit };
}

export function toApiErrorResponse(error: unknown, requestId: string): ApiErrorResponse {
  const boundaryError = error instanceof ApiBoundaryError ? error : new ApiBoundaryError("INTERNAL_ERROR");
  const policy = ERROR_POLICY[boundaryError.code];
  const details =
    boundaryError.issues.length === 0
      ? undefined
      : {
          issues: boundaryError.issues.map((issue) => ({
            field: issue.field,
            reason: issue.reason,
          })),
        };
  const errorBody = {
    code: boundaryError.code,
    message: policy.message,
    requestId,
    retryable: policy.retryable,
    ...(details === undefined ? {} : { details }),
  };
  return { body: { error: errorBody }, status: policy.status };
}
