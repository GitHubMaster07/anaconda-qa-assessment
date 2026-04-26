import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Challenge2Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '#submitButton',
    menuButton: '#menuButton',
    logoutOption: '#logoutOption',
    accountMenu: '#accountMenu',
    dashboard: '#dashboard',
    loginForm: '#loginForm',
    errorMessage: '#errorMessage',
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge2.html"]').click();
  }

  async loginSuccess(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
    
    // Race between success and error
    const errorMessage = this.page.locator(this.selectors.errorMessage);
    
    await Promise.race([
      this.page.locator(this.selectors.dashboard).waitFor({ state: 'visible' }),
      errorMessage.waitFor({ state: 'visible' })
    ]);
    
    // If error appeared, throw clear message
    if (await errorMessage.isVisible()) {
      const errorText = await errorMessage.textContent();
      throw new Error(`Login failed: ${errorText}`);
    }
    
    // Wait for menu to be initialized by JavaScript
    await this.page.waitForSelector('#menuButton[data-initialized="true"]');
  }

  async loginFail(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  async verifyLoginError(): Promise<void> {
    const errorMessage = this.page.locator(this.selectors.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid email or password');
  }

  async logout(): Promise<void> {
    const menuButton = this.page.locator(this.selectors.menuButton);
    await menuButton.click();
    
    await this.page.waitForSelector('#accountMenu.show');
    
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    await this.page.waitForSelector(this.selectors.loginForm, { state: 'visible' });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }

  async clearSession(): Promise<void> {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => localStorage.clear());
  }
}