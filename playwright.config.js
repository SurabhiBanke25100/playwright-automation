// @ts-check
import { defineConfig, devices } from '@playwright/test';
//import ReportPortal  from '@reportportal/agent-js-playwright';      // Import the ReportPortal plugin
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['@reportportal/agent-js-playwright', {  // Add ReportPortal reporter to Playwright config
      endpoint: 'http://localhost:8080/api/v1',  // ReportPortal server URL (replace with your endpoint)
      project: 'playwright_project', // Replace with your ReportPortal project name
      apiKey: 'playwright-api__XMIfcJbSVe0J7q_PVkAuuNfF9uoUfCkgO2lsMBdtgxXepubqDjXYSgz8ynoqjJn',  // ReportPortal user token
      launch: 'Playwright Test Run', // Launch name (can be dynamic)
      description: 'Playwright tests integrated with ReportPortal',  // Optional: A description

      //-----to display the steps in reportportal for passed testcases this attribut "includeTestSteps" is required to add in config file.------
      //  includeTestSteps: true,
      // 👇 ADD THIS LINE TO SHOW LOGS FOR PASSED TESTS
     
     // debug: true, // Optional: more detailed logs
     // isLaunchMergeRequired: false,
      reportSkippedTests: true,
      //logTestSteps: true, 
    }],
    ['list'],  // Optional: still show test results in the terminal
  ],


  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
     screenshot:'on',
     viewport: { width: 2000, height: 2000 },
     video: 'on',
  },
   
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
         headless: false,        // Run in headed mode
       // slowMo: 50,            // Slow down by 50ms
      },

    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    {
      name: 'MobileSafari',
      use: {
        ...devices['iPhone 12'],
        browserName: 'webkit',
      },
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

