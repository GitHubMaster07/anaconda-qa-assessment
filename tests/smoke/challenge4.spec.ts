import { test } from '@playwright/test';
import { Challenge4Page } from '../../src/pages/Challenge4Page';

test.describe('Challenge 4 - Global State @smoke', () => {
  // Tests login/logout with proper ready state checking
  // The critical fix here is waiting for __CHALLENGE4_READY__ before interacting
  test('Login and logout with ready state', async ({ page }) => {
    const challengePage = new Challenge4Page(page);
    
    await page.goto('/');
    await challengePage.navigateToChallenge(); // This waits for the global ready flag
    await challengePage.login('test@example.com', 'password');
    await challengePage.logout();
  });
});