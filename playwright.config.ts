import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

// For first setup !!
// Please run 'npx playwright install' to install the browser

// Increase the timeout to 2 minutes (because Nuxt server is start so slow)
const timeout = 120000
const hostUrl = 'http://0.0.0.0:3001'

export default defineConfig<ConfigOptions>({
  testDir: './tests/e2e',
  outputDir: 'tests-output',
  snapshotDir: 'tests-screenshot',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter:  process.env.CI ? 'dot' : 'html',
  timeout,
  use: {
    nuxt: {
      buildDir: '.output',
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      setupTimeout: timeout,
    },
    actionTimeout: 0,
    baseURL: hostUrl,
    trace: 'on-first-retry',
    screenshot: 'on',
  },
  projects: [{
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 },
      // Emulates the user locale.
      locale: 'th-TH',
      // Emulates the user timezone.
      timezoneId: 'Asia/Bangkok',
    },
    dependencies: ['setup db'],
  }, {
    name: 'setup db',
    testMatch: /global\.setup\.ts/,
    teardown: 'cleanup db',
  },  {
    name: 'cleanup db',
    testMatch: /global\.teardown\.ts/,
  },],
   /* Run your local dev server before starting the tests */
  webServer: {
    command: 'bun run dev',
    port: 3001,
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
    stdout: 'ignore',
    stderr: 'pipe',
    timeout
  },
})
