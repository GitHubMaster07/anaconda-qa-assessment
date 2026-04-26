import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge1Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '#submitButton',
    successMessage: '#successMessage',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge1.html"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  // Verifies success message contains the submitted email and password
  async verifyLoginSuccess(email: string, password: string): Promise<void> {
    const message = this.page.locator(this.selectors.successMessage);
    await expect(message).toContainText('Successfully submitted!');
    await expect(message).toContainText(`Email: ${email}`);
    await expect(message).toContainText(`Password: ${password}`);
  }
}