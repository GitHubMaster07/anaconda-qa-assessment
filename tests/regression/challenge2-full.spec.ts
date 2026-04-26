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

  // Skipped in Firefox because the original challenge app has a state management bug
  // The dashboard sometimes stays hidden after multiple login/logout cycles
  // This only happens in Firefox CI, works locally and in Chromium
  test('Multiple login and logout cycles', async ({ browserName }) => {
    test.skip(browserName === 'firefox', 'Flaky in Firefox CI due to animation timing bug in the app');
    
    for (let i = 0; i < 3; i++) {
      await challengePage.loginSuccess('test1@example.com', 'password1');
      await challengePage.logout();
      
      await challengePage.clearSession();
      await challengePage.page.waitForSelector('#loginForm', { state: 'visible' });
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