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
    
    // Wait for either dashboard to appear OR login form to disappear
    await this.page.waitForFunction(
      () => {
        const dashboard = document.querySelector('#dashboard');
        const loginForm = document.querySelector('#loginForm');
        return (dashboard && window.getComputedStyle(dashboard).display !== 'none') ||
               (loginForm && window.getComputedStyle(loginForm).display === 'none');
      }
    );
    
    // Wait for menu button to have data-initialized attribute (set by JS after animation)
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
    
    // Wait for dropdown menu to have 'show' class
    await this.page.waitForSelector('#accountMenu.show');
    
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    // Wait for login form to be visible again
    await this.page.waitForSelector(this.selectors.loginForm, { state: 'visible' });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}