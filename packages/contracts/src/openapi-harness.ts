import Ajv2020, { type AnySchemaObject, type ErrorObject } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import type { ImplementedOperation } from "./implemented-operations.js";

type UnknownRecord = Readonly<Record<string, unknown>>;

export class ContractViolationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ContractViolationError";
  }
}

function asRecord(value: unknown, message: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ContractViolationError(message);
  }
  return value as UnknownRecord;
}

function validationSummary(errors: readonly ErrorObject[] | null | undefined): string {
  return (errors ?? [])
    .map((error) => `${error.instancePath || "$"}:${error.keyword}`)
    .join(",");
}

export class OpenApiContractHarness {
  readonly #document: UnknownRecord;

  public constructor(document: unknown) {
    this.#document = asRecord(document, "OpenAPI document must be an object");
  }

  public assertOperationDeclared(operation: ImplementedOperation): void {
    const declared = this.#operation(operation.path, operation.method);
    if (declared.operationId !== operation.operationId) {
      throw new ContractViolationError(`Undeclared operation: ${operation.operationId}`);
    }
    for (const status of operation.responseStatuses) {
      this.#response(declared, status, operation.contentTypes[0] ?? "application/json");
    }
  }

  public validateResponse(
    operation: ImplementedOperation,
    status: number,
    contentType: string,
    body: unknown,
  ): void {
    const declared = this.#operation(operation.path, operation.method);
    if (declared.operationId !== operation.operationId) {
      throw new ContractViolationError(`Undeclared operation: ${operation.operationId}`);
    }
    const schema = this.#response(declared, status, contentType);
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(ajv);
    const validator = ajv.compile(schema as AnySchemaObject);
    if (!validator(body)) {
      throw new ContractViolationError(`Response body violates OpenAPI: ${validationSummary(validator.errors)}`);
    }
  }

  #operation(pathName: string, method: ImplementedOperation["method"]): UnknownRecord {
    const paths = asRecord(this.#document.paths, "OpenAPI paths are missing");
    const pathItem = asRecord(paths[pathName], `Undeclared path: ${pathName}`);
    return asRecord(pathItem[method.toLowerCase()], `Undeclared method: ${method} ${pathName}`);
  }

  #response(operation: UnknownRecord, status: number, contentType: string): unknown {
    const responses = asRecord(operation.responses, "OpenAPI operation responses are missing");
    const response = asRecord(responses[String(status)], `Undeclared response status: ${String(status)}`);
    const content = asRecord(response.content, `Response ${String(status)} has no content declaration`);
    const media = asRecord(content[contentType], `Undeclared response content type: ${contentType}`);
    return asRecord(media.schema, "Response schema is missing");
  }
}
