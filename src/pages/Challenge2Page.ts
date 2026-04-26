import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WaitHelpers } from '../utils/waitHelpers';

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
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge2.html"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
    
    // Wait for dashboard to appear (login animation takes 1 second)
    await this.page.waitForSelector(this.selectors.dashboard, { state: 'visible', timeout: 5000 });
    
    // Wait for menu button to be ready (data-initialized attribute appears after 1 second)
    await this.page.waitForSelector('#menuButton[data-initialized="true"]', { timeout: 5000 });
  }

  async logout(): Promise<void> {
    // Click menu button to open dropdown
    const menuButton = this.page.locator(this.selectors.menuButton);
    await menuButton.click();
    
    // Wait for dropdown menu to become visible
    const accountMenu = this.page.locator(this.selectors.accountMenu);
    await accountMenu.waitFor({ state: 'visible', timeout: 3000 });
    
    // Click logout option
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    // Verify login form is visible again
    await this.page.waitForSelector('#loginForm', { state: 'visible', timeout: 5000 });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}