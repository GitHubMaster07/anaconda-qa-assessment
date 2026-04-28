import { test } from '@playwright/test';
import { Challenge3Page } from '../../src/pages/Challenge3Page';

test.describe('Challenge 3 - Forgot Password @smoke', () => {
  test('Reset password successfully', async ({ page }) => {
    const challengePage = new Challenge3Page(page);
    
    await page.goto('/');
    await challengePage.navigateToChallenge();
    await challengePage.clickForgotPassword();
    await challengePage.resetPassword('test@example.com');
    await challengePage.verifySuccess();
  });
});