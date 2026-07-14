export interface ImplementedOperation {
  readonly contentTypes: readonly string[];
  readonly method: "GET" | "POST";
  readonly operationId: string;
  readonly path: string;
  readonly responseStatuses: readonly number[];
}

export const E00_IMPLEMENTED_OPERATIONS = [
  {
    contentTypes: ["application/json"],
    method: "GET",
    operationId: "getLiveness",
    path: "/health/live",
    responseStatuses: [200],
  },
  {
    contentTypes: ["application/json"],
    method: "GET",
    operationId: "getReadiness",
    path: "/health/ready",
    responseStatuses: [200, 503],
  },
] as const satisfies readonly ImplementedOperation[];
