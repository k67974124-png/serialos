import type { ImplementedOperation } from "@serialos/contracts";

export const WEB_IMPLEMENTED_OPERATIONS = [
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
