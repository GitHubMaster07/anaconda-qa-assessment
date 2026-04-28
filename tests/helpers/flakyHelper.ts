import { test } from '@playwright/test';
import { flakyConfig } from '../config/flaky.config';

/**
 * Marks a test as known flaky.
 * These tests won't fail the CI pipeline but will be logged.
 * 
 * Usage:
 * flakyTest('Test name that sometimes fails', async ({ page }) => {
 *   // test code here
 * });
 */
export function flakyTest(
  name: string, 
  body: Parameters<typeof test>[1],
  options?: { maxRetries?: number }
) {
  const isKnownFlaky = flakyConfig.knownFlaky.some(f => name.includes(f));
  const retries = options?.maxRetries || (isKnownFlaky ? flakyConfig.maxRetries : 1);
  
  test(name, async (testParams, testInfo) => {
    let attempt = 1;
    let lastError: Error | null = null;
    
    while (attempt <= retries) {
      try {
        await body(testParams, testInfo);
        if (attempt > 1) {
          console.log(`✅ Flaky test passed on attempt ${attempt}: ${name}`);
        }
        return; // Success
      } catch (error) {
        lastError = error as Error;
        console.log(`⚠️ Attempt ${attempt}/${retries} failed for: ${name}`);
        
        if (attempt === retries) {
          if (isKnownFlaky) {
            console.log(`📝 Known flaky test failed: ${name}`);
            // Don't re-throw for known flaky tests
            return;
          }
          throw lastError;
        }
        attempt++;
      }
    }
  });
}

/**
 * Logs flaky test statistics after test run
 */
export function logFlakyStats(flakyCount: number, totalTests: number): void {
  const flakyRate = (flakyCount / totalTests * 100).toFixed(2);
  console.log(`\n📊 Flaky test summary:`);
  console.log(`   - Total tests: ${totalTests}`);
  console.log(`   - Flaky occurrences: ${flakyCount}`);
  console.log(`   - Flaky rate: ${flakyRate}%`);
  
  if (parseFloat(flakyRate) > 10) {
    console.log(`⚠️ Warning: High flaky rate (>10%) - needs investigation`);
  }
}