import { test } from '@playwright/test';
import { Challenge2Page } from '../../src/pages/Challenge2Page';

test.describe('Challenge 2 - Animated Form @smoke', () => {
  // Tests login and logout with animated menu - uses waitForClickable to handle animation timing
  test('Login and logout successfully', async ({ page }) => {
    const challengePage = new Challenge2Page(page);
    
    await page.goto('/');
    await challengePage.navigateToChallenge();
    await challengePage.login('test1@example.com', 'password1');
    await challengePage.logout();
  });
});