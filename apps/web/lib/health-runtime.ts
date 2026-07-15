import type { DependencyProbe } from "@serialos/application";
import { parseRuntimeConfig } from "@serialos/config";
import { PostgresHealthProbe, PostgresQueueHealthProbe } from "@serialos/db";
import { S3BucketHealthProbe } from "@serialos/storage";

interface HealthRuntime {
  readonly probes: readonly DependencyProbe[];
}

let runtime: HealthRuntime | undefined;

export function getHealthRuntime(): HealthRuntime {
  if (runtime !== undefined) {
    return runtime;
  }

  const config = parseRuntimeConfig(process.env);
  runtime = {
    probes: [
      new PostgresHealthProbe(config.databaseUrl),
      new PostgresQueueHealthProbe(config.databaseUrl),
      new S3BucketHealthProbe(config.objectStorage),
    ],
  };
  return runtime;
}
