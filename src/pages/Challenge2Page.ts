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
  };

  async navigateToChallenge(): Promise<void> {
    await this.page.locator('a[href="/challenge2.html"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);
    
    await this.page.waitForSelector(this.selectors.dashboard, { state: 'visible', timeout: 5000 });
    
    // Menu becomes clickable only after data-initialized attribute appears
    await this.page.waitForSelector('#menuButton[data-initialized="true"]', { timeout: 5000 });
  }

  async logout(): Promise<void> {
    const menuButton = this.page.locator(this.selectors.menuButton);
    await menuButton.click();
    
    // Wait until dropdown actually becomes visible
    await this.page.waitForFunction(
      () => {
        const menu = document.querySelector('#accountMenu');
        return menu && window.getComputedStyle(menu).display !== 'none';
      },
      { timeout: 5000 }
    );
    
    const logoutOption = this.page.locator(this.selectors.logoutOption);
    await logoutOption.click();
    
    await this.page.waitForSelector('#loginForm', { state: 'visible', timeout: 5000 });
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }
}