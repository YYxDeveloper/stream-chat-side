import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'pixel-6-pro',
      use: {
        ...devices['Pixel 6 Pro'],
        viewport: { width: 412, height: 915 },
      },
    },
    {
      name: 'android-pixel-6-pro',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--disable-dev-shm-usage',
            '--no-sandbox',
          ],
        },
        viewport: { width: 412, height: 915 },
      },
      grep: /@android/,
    },
  ],
});
