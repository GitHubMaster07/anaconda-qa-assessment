# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke\challenge4.spec.ts >> Challenge 4 - Global State @smoke >> Login and logout with ready state
- Location: tests\smoke\challenge4.spec.ts:7:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="/challenge4.html"]')

```

# Page snapshot

```yaml
- generic [ref=e2]: "Error: ENOENT: no such file or directory, stat 'D:\\SDET\\anaconda-qa-assessment\\public\\index.html'"
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | import { WaitHelpers } from '../utils/waitHelpers';
  4  | 
  5  | export class Challenge4Page extends BasePage {
  6  |   constructor(page: Page) {
  7  |     super(page);
  8  |   }
  9  | 
  10 |   private selectors = {
  11 |     emailInput: '#email',
  12 |     passwordInput: '#password',
  13 |     submitButton: '#submitButton',
  14 |     profileButton: '#profileButton',
  15 |   };
  16 | 
  17 |   async navigateToChallenge(): Promise<void> {
> 18 |     await this.page.locator('a[href="/challenge4.html"]').click();
     |                                                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  19 |     // The challenge hint says: "There is a global variable that you can use to check if the app is in ready state"
  20 |     // This is that fix - waiting for the page's ready flag before any interaction
  21 |     await WaitHelpers.waitForPageReady(this.page, '__CHALLENGE4_READY__');
  22 |   }
  23 | 
  24 |   async login(email: string, password: string): Promise<void> {
  25 |     await this.page.fill(this.selectors.emailInput, email);
  26 |     await this.page.fill(this.selectors.passwordInput, password);
  27 |     await this.page.click(this.selectors.submitButton);
  28 |   }
  29 | 
  30 |   async logout(): Promise<void> {
  31 |     await this.page.click(this.selectors.profileButton);
  32 |     await this.page.getByText('Logout').click();
  33 |     await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
  34 |   }
  35 | }
```