import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: 1,
  workers: 4,

  reporter: [
  ['list'],
  ['allure-playwright']
],

  use: {
    baseURL: 'http://localhost:3000',


    // Collect trace only when a test retries (useful for debugging flaky tests)
    trace: 'on-first-retry',

    // Capture screenshot only on failure
    screenshot: 'only-on-failure',

    // Keep video only for failed tests
    video: 'retain-on-failure',

    // Keep console logs for failed tests (helps debug JS/runtime errors)
    console: 'retain-on-failure',

  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  // Start local dev server only when running tests locally
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run start',
        port: 3000,
        timeout: 120000,
        reuseExistingServer: true,
      },
});
