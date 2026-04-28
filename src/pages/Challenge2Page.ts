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
    await this.page.getByRole('link', { name: 'Challenge 2' }).click();
  }

  async loginSuccess(email: string, password: string): Promise<void> {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);

    const errorMessage = this.page.locator(this.selectors.errorMessage);
    const dashboard = this.page.locator(this.selectors.dashboard);

    // Wait for either success or error
    await Promise.race([
      dashboard.waitFor({ state: 'visible' }),
      errorMessage.waitFor({ state: 'visible' })
    ]);

    if (await errorMessage.isVisible()) {
      const errorText = await errorMessage.textContent();
      throw new Error(`Login failed: ${errorText}`);
    }

    // Wait for menu to be ready (data-initialized attribute from original HTML)
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
    const accountMenu = this.page.locator(this.selectors.accountMenu);

    // Click menu and wait for it to open
    await Promise.all([
      accountMenu.waitFor({ state: 'visible' }),
      menuButton.click()
    ]);

    // Click logout
    await this.page.locator(this.selectors.logoutOption).click();

    // Verify return to login form
    await expect(this.page.locator(this.selectors.loginForm)).toBeVisible();
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  }

  async clearSession(): Promise<void> {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => localStorage.clear());
  }
}