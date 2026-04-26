import { test } from '@playwright/test';
import { Challenge1Page } from '../../src/pages/Challenge1Page';
import { TestDataFactory } from '../../src/utils/testDataFactory';

test.describe('Challenge 1 - Multiple Logins @smoke', () => {
  test('Login three times successfully', async ({ page }) => {
    const challengePage = new Challenge1Page(page);
    
    await page.goto('/');
    await challengePage.navigateToChallenge();

    const users = TestDataFactory.generateMultipleUsers(3);

    for (const user of users) {
      await challengePage.login(user.email, user.password);
      await challengePage.verifyLoginSuccess(user.email, user.password);
      await challengePage.waitForFormReset();
    }
  });
});