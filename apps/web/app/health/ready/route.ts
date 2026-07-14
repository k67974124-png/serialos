import { createReadinessResponse } from "@serialos/application";

import { getHealthRuntime } from "../../../lib/health-runtime";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const health = await createReadinessResponse(getHealthRuntime().probes, new Date());
  return Response.json(health, { status: health.status === "ok" ? 200 : 503 });
}
