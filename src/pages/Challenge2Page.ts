import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WaitHelpers } from '../utils/waitHelpers';

export class Challenge2Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '#submitButton',
    menuButton: '#menuButton',
    logoutOption: '#logoutOption',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge2.html"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  // Handles animated menu - waits for button to be clickable before clicking
  async logout(): Promise<void> {
    const menuButton = this.page.locator(this.selectors.menuButton);
    await WaitHelpers.waitForClickable(menuButton);
    await menuButton.click();

    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await WaitHelpers.waitForClickable(logoutOption);
    await logoutOption.click();

    // Verify logout worked - login form should be visible again
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}