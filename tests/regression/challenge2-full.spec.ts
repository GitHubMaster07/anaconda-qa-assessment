import { test, expect } from '@playwright/test';
import { Challenge2Page } from '../../src/pages/Challenge2Page';

test.describe('Challenge 2 - Full Regression @regression', () => {
  let challengePage: Challenge2Page;

  test.beforeEach(async ({ page }) => {
    challengePage = new Challenge2Page(page);
    await page.goto('/');
    await challengePage.navigateToChallenge();
  });

  test('Login and logout with valid credentials', async () => {
    await challengePage.loginSuccess('test1@example.com', 'password1');
    await challengePage.logout();
  });

  test('Login with invalid credentials shows error', async () => {
    await challengePage.loginFail('wrong@example.com', 'wrongpass');
    await challengePage.verifyLoginError();
  });

  test('Logout without login first - menu should not appear', async ({ page }) => {
    const menuButton = page.locator('#menuButton');
    await expect(menuButton).not.toBeVisible();
  });

  test('Multiple login and logout cycles', async () => {
  for (let i = 0; i < 3; i++) {
    await challengePage.loginSuccess('test1@example.com', 'password1');
    await challengePage.logout();
    
    // Wait for login form to be fully visible and ready for next login
    await challengePage.page.waitForSelector('#loginForm', { state: 'visible' });
    await expect(challengePage.page.locator('#email')).toBeVisible();
    await expect(challengePage.page.locator('#password')).toBeVisible();
    await expect(challengePage.page.locator('#submitButton')).toBeVisible();
  }
});

  test('Animation completes before logout menu is clickable', async ({ page }) => {
    await challengePage.loginSuccess('test1@example.com', 'password1');
    
    const menuButton = page.locator('#menuButton');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    
    const logoutOption = page.locator('#logoutOption');
    await expect(logoutOption).toBeVisible();
  });
});