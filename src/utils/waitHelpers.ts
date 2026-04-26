import { Page } from '@playwright/test';

export class WaitHelpers {
  static async waitForAppReady(
    page: Page,
    flagName: string = '__APP_READY__'
  ): Promise<void> {
    await page.waitForFunction(
      (flag: string) => (window as any)[flag] === true,
      flagName
    );
  }

  static async waitForPageReady(
    page: Page,
    pageFlag: string
  ): Promise<void> {
    await page.waitForFunction(
      (flag: string) => (window as any)[flag] === true,
      pageFlag
    );
  }
}