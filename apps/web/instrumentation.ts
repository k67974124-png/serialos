import { parseRuntimeConfig } from "@serialos/config";

export function register(): void {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    parseRuntimeConfig(process.env);
  }
}
