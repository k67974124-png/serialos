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
});
