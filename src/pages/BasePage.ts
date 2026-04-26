import { Page } from '@playwright/test';
import { WaitHelpers } from '../utils/waitHelpers';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  // Waits for global app ready flag (Challenge 4)
  async waitForAppReady(flagName?: string): Promise<void> {
    await WaitHelpers.waitForAppReady(this.page, flagName);
  }

  // Waits for page-specific ready flag (Challenge 4)
  async waitForPageReady(flagName: string): Promise<void> {
    await WaitHelpers.waitForPageReady(this.page, flagName);
  }
}