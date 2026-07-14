import Ajv2020, { type AnySchemaObject, type ErrorObject, type ValidateFunction } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

export interface ContractValidationIssue {
  readonly field: string;
  readonly keyword: string;
  readonly reason: string;
}

export class ContractSchemaValidationError extends Error {
  public readonly issues: readonly ContractValidationIssue[];

  public constructor(issues: readonly ContractValidationIssue[]) {
    super("Contract schema validation failed");
    this.name = "ContractSchemaValidationError";
    this.issues = issues;
  }
}

function toIssues(errors: readonly ErrorObject[] | null | undefined): ContractValidationIssue[] {
  return (errors ?? []).map((error) => ({
    field: error.instancePath.length === 0 ? "$" : error.instancePath,
    keyword: error.keyword,
    reason: error.message ?? "invalid",
  }));
}

export class JsonSchemaRegistry {
  readonly #validators = new Map<string, ValidateFunction>();

  public constructor(schemas: readonly AnySchemaObject[]) {
    const ajv = new Ajv2020({ allErrors: true, allowUnionTypes: true, strict: true });
    addFormats(ajv);
    for (const schema of schemas) {
      if (typeof schema.$id !== "string" || schema.$id.length === 0) {
        throw new TypeError("Canonical JSON Schemas require a stable $id");
      }
      this.#validators.set(schema.$id, ajv.compile(schema));
    }
  }

  public parse(schemaId: string, value: unknown): unknown {
    const validator = this.#validators.get(schemaId);
    if (validator === undefined) {
      throw new TypeError("Unknown contract schema identifier");
    }
    if (!validator(value)) {
      throw new ContractSchemaValidationError(toIssues(validator.errors));
    }
    return value;
  }

  public schema<Output>(schemaId: string): RuntimeJsonSchema<Output> {
    return new RuntimeJsonSchema<Output>(this, schemaId);
  }
}

export class RuntimeJsonSchema<Output> {
  readonly #registry: JsonSchemaRegistry;
  readonly #schemaId: string;

  public constructor(registry: JsonSchemaRegistry, schemaId: string) {
    this.#registry = registry;
    this.#schemaId = schemaId;
  }

  public parse(value: unknown): Output {
    return this.#registry.parse(this.#schemaId, value) as Output;
  }
}
