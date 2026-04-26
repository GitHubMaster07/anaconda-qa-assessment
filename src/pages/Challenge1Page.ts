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
    await this.page.locator('a[href="/challenge1.html"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  async verifyLoginSuccess(email: string, password: string): Promise<void> {
    const emailDisplay = this.page.locator(this.selectors.emailDisplay);
    const passwordDisplay = this.page.locator(this.selectors.passwordDisplay);
    
    // Wait for non-empty email value (retries until condition passes)
    await expect(async () => {
      const emailText = await emailDisplay.textContent();
      expect(emailText).toBe(`Email: ${email}`);
    }).toPass({ timeout: 10000 });
    
    await expect(passwordDisplay).toHaveText(`Password: ${password}`);
  }
}