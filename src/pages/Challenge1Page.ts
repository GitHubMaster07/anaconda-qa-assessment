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
    emailDisplay: '#emailDisplay',
    passwordDisplay: '#passwordDisplay',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.getByRole('link', { name: 'Challenge 1' }).click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  async verifyLoginSuccess(email: string, password: string): Promise<void> {
    // Wait for success message to become visible (user sees it)
    await expect(this.page.locator(this.selectors.successMessage)).toBeVisible();
    
    const emailDisplay = this.page.locator(this.selectors.emailDisplay);
    const passwordDisplay = this.page.locator(this.selectors.passwordDisplay);
    
    // Verify displayed data matches what user submitted
    await expect(emailDisplay).toHaveText(`Email: ${email}`);
    await expect(passwordDisplay).toHaveText(`Password: ${password}`);
  }

  async waitForFormReset(): Promise<void> {
    // Wait for success message to disappear before next login attempt
    await expect(this.page.locator(this.selectors.successMessage)).toBeHidden();
  }
}