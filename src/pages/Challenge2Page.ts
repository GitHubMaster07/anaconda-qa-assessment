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
    
    await this.page.waitForSelector(this.selectors.dashboard, { state: 'visible', timeout: 5000 });
    await this.page.waitForSelector('#menuButton[data-initialized="true"]', { timeout: 5000 });
  }

  async loginFail(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
  }

  async verifyLoginError(): Promise<void> {
    const errorMessage = this.page.locator(this.selectors.errorMessage);
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    await expect(errorMessage).toContainText('Invalid email or password');
  }

  async logout(): Promise<void> {
    const menuButton = this.page.locator(this.selectors.menuButton);
    await menuButton.click();
    
    await this.page.waitForSelector('#accountMenu.show', { state: 'visible', timeout: 5000 });
    
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    await this.page.waitForSelector(this.selectors.loginForm, { state: 'visible', timeout: 10000 });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}