import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment specific .env file
const env = process.env.ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: 1,
  workers: 4,

  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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