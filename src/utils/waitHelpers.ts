import { Page, Locator } from '@playwright/test';

export class WaitHelpers {
  static async waitForAppReady(
    page: Page,
    flagName: string = '__APP_READY__',
    timeout: number = 15000
  ): Promise<void> {
    await page.waitForFunction(
      (flag: string) => (window as any)[flag] === true,
      flagName,
      { timeout, polling: 500 }
    );
  }

  static async waitForPageReady(
    page: Page,
    pageFlag: string,
    timeout: number = 10000
  ): Promise<void> {
    await page.waitForFunction(
      (flag: string) => (window as any)[flag] === true,
      pageFlag,
      { timeout, polling: 300 }
    );
  }

  static async waitForStablePosition(
    locator: Locator,
    stabilityThreshold: number = 3,
    checkInterval: number = 100
  ): Promise<void> {
    let lastPosition = { x: 0, y: 0 };
    let stableCount = 0;

    for (let i = 0; i < 20; i++) {
      const box = await locator.boundingBox();
      if (box) {
        const currentPosition = { x: box.x, y: box.y };
        if (currentPosition.x === lastPosition.x && currentPosition.y === lastPosition.y) {
          stableCount++;
          if (stableCount >= stabilityThreshold) return;
        } else {
          stableCount = 0;
        }
        lastPosition = currentPosition;
      }
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }
  }

  static async waitForClickable(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
    await locator.waitFor({ state: 'visible', timeout });
    
    const isEnabled = await locator.isEnabled();
    if (!isEnabled) {
      throw new Error(`Element not enabled after ${timeout}ms`);
    }
  }

  static async waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }
}