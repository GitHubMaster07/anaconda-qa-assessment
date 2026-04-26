import { test, expect } from '@playwright/test';
import { Challenge1Page } from '../../src/pages/Challenge1Page';
import { TestDataFactory } from '../../src/utils/testDataFactory';

test.describe('Challenge 1 - Full Regression @regression', () => {
  let challengePage: Challenge1Page;

  test.beforeEach(async ({ page }) => {
    challengePage = new Challenge1Page(page);
    await page.goto('/');
    await challengePage.navigateToChallenge();
  });

  test('Login with valid credentials', async () => {
    const user = TestDataFactory.generateTestUser();
    await challengePage.login(user.email, user.password);
    await challengePage.verifyLoginSuccess(user.email, user.password);
  });

  test('Login with empty email field', async ({ page }) => {
    await challengePage.login('', 'password123');
    
    // Browser validation should prevent submission or show error
    const emailInput = page.locator('#email');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('Login with empty password field', async ({ page }) => {
    await challengePage.login('test@example.com', '');
    
    const passwordInput = page.locator('#password');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  test('Login with invalid email format', async ({ page }) => {
    await challengePage.login('not-an-email', 'password123');
    
    // HTML5 validation should catch this
    const emailInput = page.locator('#email');
    const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.typeMismatch);
    expect(validity).toBe(true);
  });

  test('Login 5 times with different users', async () => {
    const users = TestDataFactory.generateMultipleUsers(5);
    
    for (const user of users) {
      await challengePage.login(user.email, user.password);
      await challengePage.verifyLoginSuccess(user.email, user.password);
      // Reload page to reset form for next attempt
      await challengePage.page.reload();
      await challengePage.navigateToChallenge();
    }
  });
});