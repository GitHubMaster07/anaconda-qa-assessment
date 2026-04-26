# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke\challenge1.spec.ts >> Challenge 1 - Multiple Logins @smoke >> Login three times successfully
- Location: tests\smoke\challenge1.spec.ts:7:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#emailDisplay')
Expected: "Email: test-1777179095663-letnol@example.com"
Received: "Email: "
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#emailDisplay')
    9 × locator resolved to <p id="emailDisplay">Email: </p>
      - unexpected value "Email: "

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Login Form" [level=2] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - textbox "Email" [ref=e6]:
        - /placeholder: " "
      - generic: Email
    - generic [ref=e7]:
      - textbox "Password" [ref=e8]:
        - /placeholder: " "
      - generic: Password
    - button "Sign In" [active] [ref=e9] [cursor=pointer]
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class Challenge1Page extends BasePage {
  5  |   constructor(page: Page) {
  6  |     super(page);
  7  |   }
  8  | 
  9  |   private selectors = {
  10 |     emailInput: '#email',
  11 |     passwordInput: '#password',
  12 |     submitButton: '#submitButton',
  13 |     successMessage: '#successMessage',
  14 |     emailDisplay: '#emailDisplay',
  15 |     passwordDisplay: '#passwordDisplay',
  16 |   };
  17 | 
  18 |   async navigateToChallenge(): Promise<void> {
  19 |     await this.page.locator('a[href="/challenge1.html"]').click();
  20 |   }
  21 | 
  22 |   async login(email: string, password: string): Promise<void> {
  23 |     await this.page.fill(this.selectors.emailInput, email);
  24 |     await this.page.fill(this.selectors.passwordInput, password);
  25 |     await this.page.click(this.selectors.submitButton);
  26 |   }
  27 | 
  28 |   async verifyLoginSuccess(email: string, password: string): Promise<void> {
  29 |     // Wait for success message to become visible (animation takes 2 seconds)
  30 |     const message = this.page.locator(this.selectors.successMessage);
  31 |     await message.waitFor({ state: 'visible', timeout: 8000 });
  32 |     
  33 |     // Wait for email and password display elements to have actual text (not empty)
  34 |     const emailDisplay = this.page.locator(this.selectors.emailDisplay);
  35 |     const passwordDisplay = this.page.locator(this.selectors.passwordDisplay);
  36 |     
  37 |     // Wait until text is not empty
  38 |     await this.page.waitForFunction(
  39 |       (selector) => {
  40 |         const el = document.querySelector(selector);
  41 |         return el && el.textContent && el.textContent.includes('Email:');
  42 |       },
  43 |       this.selectors.emailDisplay,
  44 |       { timeout: 5000 }
  45 |     );
  46 |     
> 47 |     await expect(emailDisplay).toHaveText(`Email: ${email}`);
     |                                ^ Error: expect(locator).toHaveText(expected) failed
  48 |     await expect(passwordDisplay).toHaveText(`Password: ${password}`);
  49 |   }
  50 | }
```