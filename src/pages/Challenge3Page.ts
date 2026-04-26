import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge3Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    mainContent: '#mainContent',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge3.html"]').click();
  }

  async clickForgotPassword(): Promise<void> {
    // Using regex for case-insensitive matching (modal button text may vary)
    await this.page.getByRole('button', { name: /forgot password/i }).click();
  }

  async resetPassword(email: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.getByRole('button', { name: /reset password/i }).click();
  }

  async verifySuccess(): Promise<void> {
    // Case-insensitive heading check
    await expect(this.page.getByRole('heading', { name: /success/i })).toBeVisible();
    // Flexible text matching for the reset message
    await expect(this.page.locator(this.selectors.mainContent)).toContainText(/password reset link sent/i);
  }
}