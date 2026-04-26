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
    const message = this.page.locator(this.selectors.successMessage);
    await message.waitFor({ state: 'visible' });
    
    const emailDisplay = this.page.locator(this.selectors.emailDisplay);
    const passwordDisplay = this.page.locator(this.selectors.passwordDisplay);
    
    await expect(async () => {
      const emailText = await emailDisplay.textContent();
      const passwordText = await passwordDisplay.textContent();
      expect(emailText).toBe(`Email: ${email}`);
      expect(passwordText).toBe(`Password: ${password}`);
    }).toPass();
  }
}