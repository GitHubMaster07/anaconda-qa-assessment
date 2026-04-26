// Test categorization tags for CI/CD pipeline filtering
// Usage: test('description @smoke @critical', async () => {})

export const TestTags = {
  SMOKE: '@smoke',       // Runs on every PR - quick feedback
  REGRESSION: '@regression', // Full suite - runs nightly
  CRITICAL: '@critical', // Blocks release if fails
  NIGHTLY: '@nightly',   // Long-running tests
} as const;