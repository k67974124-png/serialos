export const DEPENDENCY_STATES = ["not_checked", "ok", "unavailable"] as const;

export type DependencyState = (typeof DEPENDENCY_STATES)[number];

export interface HealthResponse {
  readonly checkedAt: string;
  readonly dependencies?: Readonly<Record<string, DependencyState>>;
  readonly status: "degraded" | "ok" | "unavailable";
}
