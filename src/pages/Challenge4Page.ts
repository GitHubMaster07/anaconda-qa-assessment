import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WaitHelpers } from '../utils/waitHelpers';

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
    await this.page.locator('a[href="/challenge4.html"]').click();
    
    // The app uses window.isAppReady flag (not __CHALLENGE4_READY__)
    await this.page.waitForFunction(
      () => (window as any).isAppReady === true,
      { timeout: 10000, polling: 500 }
    );
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
    
    // Wait for user profile to appear (login successful)
    await this.page.waitForSelector(this.selectors.userProfile, { state: 'visible', timeout: 5000 });
  }

  async logout(): Promise<void> {
    // Click profile button to open dropdown
    const profileButton = this.page.locator(this.selectors.profileButton);
    await profileButton.click();
    
    // Click logout option
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    // Verify login form is visible again
    await this.page.waitForSelector(this.selectors.loginForm, { state: 'visible', timeout: 5000 });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}