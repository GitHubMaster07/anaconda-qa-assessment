import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge3Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    forgotButton: 'button.link-button',
    resetButton: 'button.submit-btn',
    successHeading: 'h3',
    successMessageText: '.success-message p',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge3.html"]').click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.page.click('button.link-button');
  }

  async resetPassword(email: string): Promise<void> {
    // Wait for the forgot password form to appear
    await this.page.waitForSelector('input#email', { timeout: 5000 });
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.click('button.submit-btn');
  }

  async verifySuccess(): Promise<void> {
    // Wait for success message container to appear
    await this.page.waitForSelector('.success-message', { timeout: 5000 });
    
    // Check for "Success!" heading - it's inside h3 tag
    const heading = this.page.locator('h3');
    await expect(heading).toContainText('Success');
    
    // Check for password reset message
    const message = this.page.locator('.success-message');
    await expect(message).toContainText('Password reset link sent');
  }
}