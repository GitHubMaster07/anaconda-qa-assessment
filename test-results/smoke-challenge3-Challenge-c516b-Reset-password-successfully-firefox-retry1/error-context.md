# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke\challenge3.spec.ts >> Challenge 3 - Forgot Password @smoke >> Reset password successfully
- Location: tests\smoke\challenge3.spec.ts:6:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="/challenge3.html"]')

```

# Page snapshot

```yaml
- generic [ref=e2]: "Error: ENOENT: no such file or directory, stat 'D:\\SDET\\anaconda-qa-assessment\\public\\index.html'"
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class Challenge3Page extends BasePage {
  5  |   constructor(page: Page) {
  6  |     super(page);
  7  |   }
  8  | 
  9  |   private selectors = {
  10 |     emailInput: '#email',
  11 |     mainContent: '#mainContent',
  12 |   };
  13 | 
  14 |   async navigateToChallenge(): Promise<void> {
> 15 |     await this.page.locator('a[href="/challenge3.html"]').click();
     |                                                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  16 |   }
  17 | 
  18 |   async clickForgotPassword(): Promise<void> {
  19 |     // Using regex for case-insensitive matching (modal button text may vary)
  20 |     await this.page.getByRole('button', { name: /forgot password/i }).click();
  21 |   }
  22 | 
  23 |   async resetPassword(email: string): Promise<void> {
  24 |     await this.page.fill(this.selectors.emailInput, email);
  25 |     await this.page.getByRole('button', { name: /reset password/i }).click();
  26 |   }
  27 | 
  28 |   async verifySuccess(): Promise<void> {
  29 |     // Case-insensitive heading check
  30 |     await expect(this.page.getByRole('heading', { name: /success/i })).toBeVisible();
  31 |     // Flexible text matching for the reset message
  32 |     await expect(this.page.locator(this.selectors.mainContent)).toContainText(/password reset link sent/i);
  33 |   }
  34 | }
```