import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge4Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '#submitButton',
    profileButton: '#profileButton',
    userProfile: '#userProfile',
    loginForm: '#loginForm',
    logoutOption: '#logoutOption',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.getByRole('link', { name: 'Challenge 4' }).click();
    
    // App sets window.isAppReady after jQuery loads
    await this.page.waitForFunction(
      () => (window as any).isAppReady === true
    );
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
    await this.page.waitForSelector(this.selectors.userProfile, { state: 'visible' });
  }

  async logout(): Promise<void> {
    const profileButton = this.page.locator(this.selectors.profileButton);
    await profileButton.click();
    
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    await this.page.waitForSelector(this.selectors.loginForm, { state: 'visible' });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}