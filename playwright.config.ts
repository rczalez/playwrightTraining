import { defineConfig, devices } from '@playwright/test';
import EnvVariable from './utils/env_variables';

const envVariables = EnvVariable.getEnvVariables();

export default defineConfig({

  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['html'], ['playwright-qatouch-reporter'], [
    "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
    {
      channels: ["tech-automated-tests"], // provide one or more Slack channels
      sendResults: "always", // "always" , "on-failure", "off"
      slackOAuthToken: envVariables.SLACK_OAUTH_TOKEN, // Slack OAuth Token
      showInThread: true,
      meta: [
        {
            key: 'Environment',
            value: 'Staging',
        },
        {
            key: 'Version',
            value: '2.16.0', // depending on your CI environment, this can be the branch name, build id, etc
        },
        {
            key: 'Browser',
            value: 'Chrome',
        },
    ],
    },
    
  ]],
  timeout: 200 * 1000,
  use: {
    baseURL: envVariables.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Automatically take screenshots on failure
    viewport: null,
    launchOptions: {
      headless: envVariables.HEADLESS_DEBUG, // true: to Run in UI mode
      args: ['--start-maximized'], // Start the browser maximized
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null, // Ensure the viewport is set to null
        launchOptions: {
          headless: envVariables.HEADLESS_DEBUG, // true: Run in UI mode
          args: ['--start-maximized'], // Start the browser maximizeø,bh vvvve489444
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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

});
