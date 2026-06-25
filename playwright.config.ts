import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration.
 * Tests run against the production preview server (`npm run preview`).
 * Only Chromium is used to keep CI fast; add webkit/firefox when coverage gaps matter.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run each test file in parallel */
  fullyParallel: true,
  /* Fail the build on CI if a test.only was accidentally committed */
  forbidOnly: !!process.env.CI,
  /* No retries locally; 2 retries on CI */
  retries: process.env.CI ? 2 : 0,
  /* Parallelism: use all workers locally, 1 on CI */
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    /* Base URL — matches `npm run preview` (port 4173) */
    baseURL: "http://localhost:4173",
    /* Capture trace on first retry for CI debugging */
    trace: "on-first-retry",
    /* Short timeout — the preview server serves pre-built static files */
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  /* Start the Vite preview server before running tests */
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
