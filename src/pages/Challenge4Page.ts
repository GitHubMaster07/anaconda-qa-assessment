import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WaitHelpers } from '../utils/waitHelpers';

export class Challenge4Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '#submitButton',
    profileButton: '#profileButton',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge4.html"]').click();
    // The challenge hint says: "There is a global variable that you can use to check if the app is in ready state"
    // This is that fix - waiting for the page's ready flag before any interaction
    await WaitHelpers.waitForPageReady(this.page, '__CHALLENGE4_READY__');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  async logout(): Promise<void> {
    await this.page.click(this.selectors.profileButton);
    await this.page.getByText('Logout').click();
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}