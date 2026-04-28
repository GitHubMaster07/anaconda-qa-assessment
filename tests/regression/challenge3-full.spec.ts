import { test, expect } from '@playwright/test';
import { Challenge3Page } from '../../src/pages/Challenge3Page';

test.describe('Challenge 3 - Full Regression @regression', () => {
  let challengePage: Challenge3Page;

  test.beforeEach(async ({ page }) => {
    challengePage = new Challenge3Page(page);
    await page.goto('/');
    await challengePage.navigateToChallenge();
  });

  test('Reset password with valid email', async () => {
    await challengePage.clickForgotPassword();
    await challengePage.resetPassword('test@example.com');
    await challengePage.verifySuccess();
  });

  test('Reset password with invalid email format', async ({ page }) => {
    await challengePage.clickForgotPassword();
    await challengePage.resetPassword('not-an-email');
    
    const emailInput = page.locator('#email');
    const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.typeMismatch);
    expect(validity).toBe(true);
  });

  test('Reset password with empty email', async ({ page }) => {
    await challengePage.clickForgotPassword();
    await challengePage.resetPassword('');
    
    const emailInput = page.locator('#email');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('Forgot password modal closes and reopens', async ({ page }) => {
    await challengePage.clickForgotPassword();
    await page.keyboard.press('Escape');
    await challengePage.clickForgotPassword();
    await expect(page.locator('#email')).toBeVisible();
  });

  test('Success message contains correct email', async () => {
    const testEmail = 'user@example.com';
    await challengePage.clickForgotPassword();
    await challengePage.resetPassword(testEmail);
    await challengePage.verifySuccess();
    
    const mainContent = page.locator('#mainContent');
    await expect(mainContent).toContainText(testEmail);
  });
});