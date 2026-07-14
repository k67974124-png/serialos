import { createLivenessResponse } from "@serialos/application";

export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(createLivenessResponse(new Date()), { status: 200 });
}
