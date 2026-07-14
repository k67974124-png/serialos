import type { DependencyState, HealthResponse } from "@serialos/contracts";

export interface DependencyProbe {
  readonly name: string;
  check(): Promise<void>;
}

export function createLivenessResponse(checkedAt: Date): HealthResponse {
  return {
    checkedAt: checkedAt.toISOString(),
    dependencies: {},
    status: "ok",
  };
}

export async function createReadinessResponse(
  probes: readonly DependencyProbe[],
  checkedAt: Date,
): Promise<HealthResponse> {
  const entries = await Promise.all(
    probes.map(async (probe): Promise<readonly [string, DependencyState]> => {
      try {
        await probe.check();
        return [probe.name, "ok"];
      } catch {
        return [probe.name, "unavailable"];
      }
    }),
  );
  const dependencies = Object.fromEntries(entries);
  const ready = Object.values(dependencies).every((status) => status === "ok");

  return {
    checkedAt: checkedAt.toISOString(),
    dependencies,
    status: ready ? "ok" : "unavailable",
  };
}
