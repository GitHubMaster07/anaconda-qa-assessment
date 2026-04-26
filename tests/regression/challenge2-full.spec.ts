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
    await challengePage.login('test1@example.com', 'password1');
    await challengePage.logout();
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    await challengePage.login('wrong@example.com', 'wrongpass');
    
    // Animated form should still show error message
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
  });

  test('Logout without login first - menu should not appear', async ({ page }) => {
    const menuButton = page.locator('#menuButton');
    await expect(menuButton).not.toBeVisible();
  });

  test('Multiple login and logout cycles', async () => {
    for (let i = 0; i < 3; i++) {
      await challengePage.login('test1@example.com', 'password1');
      await challengePage.logout();
    }
  });

  test('Animation completes before logout menu is clickable', async ({ page }) => {
    await challengePage.login('test1@example.com', 'password1');
    
    // Menu button should be visible but may be animating
    const menuButton = page.locator('#menuButton');
    await expect(menuButton).toBeVisible();
    
    // Wait a bit for animation then click
    await page.waitForTimeout(300);
    await menuButton.click();
    
    const logoutOption = page.locator('#logoutOption');
    await expect(logoutOption).toBeVisible();
  });
});