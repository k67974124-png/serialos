import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type { AnySchemaObject } from "ajv";
import { describe, expect, it } from "vitest";

import type { ModelRoute } from "../../ai/src/routing.js";
import { DeterministicProviderFakes } from "../../testkit/src/provider-fakes.js";
import {
  ContractSchemaValidationError,
  JsonSchemaRegistry,
} from "../src/schema-registry.js";

const repositoryRoot = path.resolve(import.meta.dirname, "..", "..", "..");
const schemaRoot = path.join(repositoryRoot, "schemas");
const exampleRoot = path.join(repositoryRoot, "examples");

type CanonicalSchema = AnySchemaObject & { readonly $id: string };

function parseJson(text: string): unknown {
  return JSON.parse(text) as unknown;
}

function parseCanonicalSchema(text: string): CanonicalSchema {
  const value = parseJson(text);
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    !("$id" in value) ||
    typeof value.$id !== "string"
  ) {
    throw new TypeError("Canonical schema requires a string $id");
  }
  return value as CanonicalSchema;
}

const schemaFiles = (await readdir(schemaRoot))
  .filter((name) => name.endsWith(".schema.json"))
  .sort();
const schemas = await Promise.all(
  schemaFiles.map(async (name) =>
    parseCanonicalSchema(await readFile(path.join(schemaRoot, name), "utf8")),
  ),
);
const registry = new JsonSchemaRegistry(schemas);

const route: ModelRoute = {
  modelId: "fixture-model",
  pricing: {
    inputMicrosUsdPerMillionTokens: 0n,
    outputMicrosUsdPerMillionTokens: 0n,
  },
  provider: "fixture-provider",
  reasoningLevel: "fixture",
};

describe("Draft 2020-12 AI output contracts", () => {
  it("validates all nine canonical examples", async () => {
    expect(schemaFiles).toHaveLength(9);
    for (const [index, schemaFile] of schemaFiles.entries()) {
      const schema = schemas[index];
      if (schema === undefined) {
        throw new Error("Schema inventory changed during the contract test");
      }
      const example = parseJson(
        await readFile(
          path.join(exampleRoot, schemaFile.replace(".schema.json", ".example.json")),
          "utf8",
        ),
      );
      expect(registry.parse(schema.$id, example)).toEqual(example);
    }
  });

  it("returns field-only issues for invalid structured output", () => {
    const materialSchemaId = "https://serialos.local/schemas/material-item.schema.json";
    let captured: unknown;
    try {
      registry.parse(materialSchemaId, { title: "missing required fields" });
    } catch (error) {
      captured = error;
    }
    expect(captured).toBeInstanceOf(ContractSchemaValidationError);
    if (!(captured instanceof ContractSchemaValidationError)) {
      throw new Error("Expected a contract schema validation error");
    }
    expect(captured.issues.some((issue) => issue.keyword === "required")).toBe(true);
  });

  it("runs deterministic AI results through the production registry", async () => {
    const schemaFile = "topic-candidate.schema.json";
    const schema = schemas.find((candidate) => candidate.$id.endsWith(schemaFile));
    if (schema === undefined) {
      throw new Error("Missing canonical topic candidate schema");
    }
    const validFixture = parseJson(
      await readFile(path.join(exampleRoot, "topic-candidate.example.json"), "utf8"),
    );
    const validGateway = new DeterministicProviderFakes({
      scenario: "success",
      structuredFixture: validFixture,
    });
    const invalidGateway = new DeterministicProviderFakes({
      scenario: "success",
      structuredFixture: { candidateId: "not-a-valid-output" },
    });
    const runtimeSchema = registry.schema<unknown>(schema.$id);
    const request = {
      input: {},
      promptId: "topic.candidate",
      promptVersion: "1.0.0",
      route,
      schemaId: "topic.candidate.output",
      schemaVersion: "1.0.0",
    } as const;

    await expect(validGateway.generate(request, runtimeSchema)).resolves.toMatchObject({
      data: validFixture,
    });
    await expect(invalidGateway.generate(request, runtimeSchema)).rejects.toMatchObject({
      kind: "schema_invalid",
      retryable: false,
    });
  });

  it("does not expose invalid values through schema errors", () => {
    const secret = "SECRET_RAW_VALUE";
    let captured: unknown;
    try {
      registry.parse("https://serialos.local/schemas/material-item.schema.json", {
        title: secret,
      });
    } catch (error) {
      captured = error;
    }
    expect(captured).toBeInstanceOf(ContractSchemaValidationError);
    expect(JSON.stringify(captured)).not.toContain(secret);
  });
});
