import { existsSync } from "node:fs";
import process from "node:process";

import { chromium, defineConfig } from "@playwright/test";

function installedBrowserFallback(): "chrome" | undefined {
  if (existsSync(chromium.executablePath())) {
    return undefined;
  }
  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        ]
      : process.platform === "darwin"
        ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
        : ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable"];
  return candidates.some((candidate) => existsSync(candidate)) ? "chrome" : undefined;
}

const browserChannel = installedBrowserFallback();

const testEnvironment = {
  AI_RUN_HARD_BUDGET_USD: "8",
  AI_RUN_SOFT_BUDGET_USD: "3",
  APP_URL: "http://127.0.0.1:53010",
  DATABASE_URL:
    process.env.TEST_DATABASE_URL ??
    "postgresql://serialos:serialos-test-only@127.0.0.1:55432/serialos_test",
  NODE_ENV: "test",
  S3_ACCESS_KEY_ID: process.env.TEST_S3_ACCESS_KEY_ID ?? "minio-test",
  S3_BUCKET: process.env.TEST_S3_BUCKET ?? "serialos-test",
  S3_ENDPOINT: process.env.TEST_S3_ENDPOINT ?? "http://127.0.0.1:59000",
  S3_FORCE_PATH_STYLE: "true",
  S3_REGION: "us-east-1",
  S3_SECRET_ACCESS_KEY: process.env.TEST_S3_SECRET_ACCESS_KEY ?? "serialos-minio-test-only",
  WEB_PORT: "53010",
  WORKER_HEALTH_HOST: "127.0.0.1",
  WORKER_HEALTH_PORT: "53011",
} as const;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  forbidOnly: true,
  retries: process.env.CI === "true" ? 1 : 0,
  reporter: "list",
  use: {
    ...(browserChannel === undefined ? {} : { channel: browserChannel }),
    baseURL: "http://127.0.0.1:53010",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm --filter @serialos/web dev",
    env: testEnvironment,
    reuseExistingServer: false,
    timeout: 120_000,
    url: "http://127.0.0.1:53010/health/live",
  },
});
