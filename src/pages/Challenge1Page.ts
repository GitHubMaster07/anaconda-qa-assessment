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
    // Wait for success message to become visible (animation takes 2 seconds)
    const message = this.page.locator(this.selectors.successMessage);
    await message.waitFor({ state: 'visible', timeout: 5000 });
    
    // Check email and password display elements
    const emailDisplay = this.page.locator(this.selectors.emailDisplay);
    const passwordDisplay = this.page.locator(this.selectors.passwordDisplay);
    
    await expect(emailDisplay).toHaveText(`Email: ${email}`);
    await expect(passwordDisplay).toHaveText(`Password: ${password}`);
  }
}