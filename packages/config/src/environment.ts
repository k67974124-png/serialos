export const DEPLOYMENT_ENVIRONMENTS = ["development", "test", "production"] as const;

export type DeploymentEnvironment = (typeof DEPLOYMENT_ENVIRONMENTS)[number];

export function isDeploymentEnvironment(value: string): value is DeploymentEnvironment {
  return DEPLOYMENT_ENVIRONMENTS.some((environment) => environment === value);
}
