export const flakyConfig = {
  // Maximum retries for known flaky tests
  maxRetries: 3,
  
  // Tests marked as known flaky (won't fail CI)
  knownFlaky: [
    'Multiple login and logout cycles',
    'Login action should complete under 3 seconds'
  ],
  
  // Tests that are temporarily disabled
  temporarilySkipped: [] as string[],
  
  // Slack webhook for flaky notifications (if needed)
  slackWebhook: process.env.SLACK_WEBHOOK_URL || null
};