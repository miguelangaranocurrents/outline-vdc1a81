import { currentsReporter } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";
import currentsConfig from "./currents.config";

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./global-setup.ts",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results.json" }],
    ...(process.env.CURRENTS_RECORD_KEY ? [currentsReporter(currentsConfig)] : []),
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    storageState: ".auth/admin.json",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: "on",
    video: "on",
    screenshot: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } },
    },
  ],
});
