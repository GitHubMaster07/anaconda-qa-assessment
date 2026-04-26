import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge3Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge3.html"]').click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.page.click('button.link-button');
    await this.page.waitForSelector('input#email');
  }

  async resetPassword(email: string): Promise<void> {
    await this.page.fill('#email', email);
    await this.page.click('button.submit-btn');
  }

  async verifySuccess(): Promise<void> {
    const message = this.page.locator('.success-message');
    
    await expect(async () => {
      await expect(message).toContainText('Password reset link sent');
    }).toPass();
  }
}