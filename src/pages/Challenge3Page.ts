import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge3Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToChallenge(): Promise<void> {
    await this.page.getByRole('link', { name: 'Challenge 3' }).click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.page.getByRole('button', { name: /forgot password/i }).click();
  }

  async resetPassword(email: string): Promise<void> {
    await this.page.waitForSelector('#email');
    await this.page.fill('#email', email);
    await this.page.getByRole('button', { name: /reset password/i }).click();
  }

  async verifySuccess(): Promise<void> {
    await this.page.waitForSelector('.success-message[data-test-ready="true"]');
    
    const message = this.page.locator('.success-message');
    await expect(message).toContainText('Password reset link sent');
  }
}