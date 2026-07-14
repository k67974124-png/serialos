import { readdir } from "node:fs/promises";
import path from "node:path";

import SwaggerParser from "@apidevtools/swagger-parser";
import { describe, expect, it } from "vitest";

import { WEB_IMPLEMENTED_OPERATIONS } from "../../../apps/web/lib/implemented-routes.js";
import { createLivenessResponse, createReadinessResponse } from "../../application/src/health.js";
import { E00_IMPLEMENTED_OPERATIONS } from "../src/implemented-operations.js";
import { ContractViolationError, OpenApiContractHarness } from "../src/openapi-harness.js";

const openApiPath = path.resolve(import.meta.dirname, "..", "..", "..", "contracts", "openapi.yaml");
const document = await SwaggerParser.dereference(openApiPath);
const harness = new OpenApiContractHarness(document);

async function routeFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await routeFiles(entryPath)));
    } else if (entry.name === "route.ts") {
      files.push(entryPath);
    }
  }
  return files;
}

describe("E00 OpenAPI operation contract", () => {
  it("fully parses and dereferences the canonical OpenAPI 3.1 source", () => {
    expect("openapi" in document ? document.openapi : undefined).toBe("3.1.0");
    expect(Object.keys(document.paths ?? {})).toHaveLength(81);
  });

  it("registers exactly the two health operations and no later-Epic handler", async () => {
    expect(WEB_IMPLEMENTED_OPERATIONS).toEqual(E00_IMPLEMENTED_OPERATIONS);
    const appRoot = path.resolve(import.meta.dirname, "..", "..", "..", "apps", "web", "app");
    const registeredPaths = (await routeFiles(appRoot))
      .map((file) => `/${path.relative(appRoot, path.dirname(file)).replaceAll("\\", "/")}`)
      .sort();
    expect(registeredPaths).toEqual(["/health/live", "/health/ready"]);
    for (const operation of E00_IMPLEMENTED_OPERATIONS) {
      expect(() => {
        harness.assertOperationDeclared(operation);
      }).not.toThrow();
    }
  });

  it("validates liveness and both readiness response states", async () => {
    const checkedAt = new Date("2026-07-13T00:00:00.000Z");
    const liveness = createLivenessResponse(checkedAt);
    const ready = await createReadinessResponse(
      [{ name: "postgres", check: () => Promise.resolve() }],
      checkedAt,
    );
    const unavailable = await createReadinessResponse(
      [{ name: "postgres", check: () => Promise.reject(new Error("synthetic failure")) }],
      checkedAt,
    );

    expect(() => {
      harness.validateResponse(E00_IMPLEMENTED_OPERATIONS[0], 200, "application/json", liveness);
      harness.validateResponse(E00_IMPLEMENTED_OPERATIONS[1], 200, "application/json", ready);
      harness.validateResponse(E00_IMPLEMENTED_OPERATIONS[1], 503, "application/json", unavailable);
    }).not.toThrow();
  });

  it("rejects undeclared status, content type, operation, and malformed response", () => {
    const validBody = createLivenessResponse(new Date("2026-07-13T00:00:00.000Z"));
    expect(() => {
      harness.validateResponse(E00_IMPLEMENTED_OPERATIONS[0], 201, "application/json", validBody);
    }).toThrow(ContractViolationError);
    expect(() => {
      harness.validateResponse(E00_IMPLEMENTED_OPERATIONS[0], 200, "text/html", validBody);
    }).toThrow(ContractViolationError);
    expect(() => {
      harness.assertOperationDeclared({
        ...E00_IMPLEMENTED_OPERATIONS[0],
        operationId: "futureOperation",
      });
    }).toThrow(ContractViolationError);
    expect(() => {
      harness.validateResponse(E00_IMPLEMENTED_OPERATIONS[0], 200, "application/json", {
        checkedAt: "not-a-date",
        status: "fake-success",
      });
    }).toThrow(ContractViolationError);
  });
});
