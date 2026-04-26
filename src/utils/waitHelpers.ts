import { Page, Locator, test } from '@playwright/test';

export class WaitHelpers {
  // Uses test timeout from config instead of hardcoded value
  static async waitForAppReady(
    page: Page,
    flagName: string = '__APP_READY__'
  ): Promise<void> {
    const timeout = test.info().timeout || 30000;
    
    await page.waitForFunction(
      (flag: string) => (window as any)[flag] === true,
      flagName,
      { timeout, polling: 500 }
    );
  }

  // Uses test timeout from config instead of hardcoded value
  static async waitForPageReady(
    page: Page,
    pageFlag: string
  ): Promise<void> {
    const timeout = test.info().timeout || 30000;
    
    await page.waitForFunction(
      (flag: string) => (window as any)[flag] === true,
      pageFlag,
      { timeout, polling: 300 }
    );
  }

  // Waits for element position to stabilize, throws error if never stabilizes
  static async waitForStablePosition(
    locator: Locator,
    stabilityThreshold: number = 3,
    checkInterval: number = 100
  ): Promise<void> {
    let lastPosition = { x: 0, y: 0 };
    let stableCount = 0;
    const maxAttempts = 20;

    for (let i = 0; i < maxAttempts; i++) {
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
    
    throw new Error(`Element position did not stabilize after ${maxAttempts} attempts`);
  }

  // Uses test timeout instead of hardcoded value
  static async waitForNetworkIdle(page: Page): Promise<void> {
    const timeout = test.info().timeout || 30000;
    await page.waitForLoadState('networkidle', { timeout });
  }
}