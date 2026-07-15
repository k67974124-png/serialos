import { asRequestId } from "@serialos/domain";

import type { JobCheckpoint, JobCorrelation, MinimalJobPayload, SafeJobError } from "./job.js";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const STEP_PATTERN = /^[a-z][a-z0-9_.-]{0,79}$/u;
const TRACE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/u;

export class UnsafeJobDataError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "UnsafeJobDataError";
  }
}

export function assertMinimalJobPayload(value: unknown): asserts value is MinimalJobPayload {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new UnsafeJobDataError("Job payload must be an ID/version object");
  }
  const entries = Object.entries(value);
  if (entries.length === 0 || entries.length > 20) {
    throw new UnsafeJobDataError("Job payload must contain 1 to 20 resource references");
  }
  for (const [key, entry] of entries) {
    if (key.endsWith("Id")) {
      if (typeof entry !== "string" || !UUID_PATTERN.test(entry)) {
        throw new UnsafeJobDataError(`Job payload field ${key} must be a UUID`);
      }
      continue;
    }
    if (key.endsWith("Version")) {
      if (typeof entry !== "number" || !Number.isInteger(entry) || entry < 1) {
        throw new UnsafeJobDataError(`Job payload field ${key} must be a positive integer`);
      }
      continue;
    }
    throw new UnsafeJobDataError(`Job payload field ${key} is not an ID or version`);
  }
}

export function validateJobCorrelation(requestId: string, traceId: string): JobCorrelation {
  if (!TRACE_ID_PATTERN.test(traceId)) {
    throw new UnsafeJobDataError("Job trace ID is invalid");
  }
  return { requestId: asRequestId(requestId), traceId };
}

function assertStringMap(value: unknown, name: string): asserts value is Record<string, string> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new UnsafeJobDataError(`${name} must be an object`);
  }
  for (const [key, entry] of Object.entries(value)) {
    if (
      !STEP_PATTERN.test(key) ||
      typeof entry !== "string" ||
      entry.length === 0 ||
      entry.length > 500
    ) {
      throw new UnsafeJobDataError(`${name} contains an invalid entry`);
    }
  }
}

export function assertJobCheckpoint(value: unknown): asserts value is JobCheckpoint {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new UnsafeJobDataError("Job checkpoint must be an object");
  }
  const checkpoint = value as Record<string, unknown>;
  if (
    !Array.isArray(checkpoint.completedSteps) ||
    checkpoint.completedSteps.some(
      (step) => typeof step !== "string" || !STEP_PATTERN.test(step),
    ) ||
    new Set(checkpoint.completedSteps).size !== checkpoint.completedSteps.length
  ) {
    throw new UnsafeJobDataError("Job checkpoint completedSteps are invalid");
  }
  assertStringMap(checkpoint.providerRequestIds, "providerRequestIds");
  assertStringMap(checkpoint.resultIds, "resultIds");
  const keys = Object.keys(checkpoint).sort();
  if (keys.join(",") !== "completedSteps,providerRequestIds,resultIds") {
    throw new UnsafeJobDataError("Job checkpoint contains unsupported state");
  }
}

export function assertSafeJobError(value: SafeJobError): void {
  if (!/^[A-Z][A-Z0-9_]{1,79}$/u.test(value.code)) {
    throw new UnsafeJobDataError("Job error code is invalid");
  }
}
