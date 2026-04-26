# 🎯 Anaconda QA Assessment

[![Smoke Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml)
[![Regression Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml)
[![Tests](https://img.shields.io/badge/tests-38%20passing-brightgreen)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)

**QA Automation Engineer skills demonstration – Production-grade Playwright automation framework**

> Built for Anaconda AI platform team interview | Senior QA Engineer level

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture Decisions](#-architecture-decisions)
- [Challenges Solved](#-challenges-solved)
- [Before vs After](#-before-vs-after)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Test Results](#-test-results)
- [CI/CD Pipelines](#-cicd-pipelines)
- [Test Commands](#-test-commands)

## 📖 Overview

Production-ready test automation for Playwright Testing Challenges. Enterprise patterns, CI/CD integration, solutions to flaky tests.

| Aspect | Implementation |
|--------|----------------|
| Framework | Playwright + TypeScript |
| Pattern | Page Object Model (POM) |
| CI/CD | GitHub Actions |
| Parallelization | 4 workers |
| Test Types | Smoke, Regression |

---

## 📦 What This Repo Contains

### 🧠 Architecture Decisions

### Why Page Object Model?
**Problem**: Original tests had duplicate selectors and logic across 4 challenges.
**Solution**: Extracted all page interactions into dedicated classes.
**Benefit**: When UI changes, fix once in Page Object, not in every test.

### Why Test Data Factory?
**Problem**: Hardcoded `test1@example.com` causes conflicts in parallel runs.
**Solution**: Generate unique emails using `Date.now()` + random string.
**Benefit**: Tests can run in parallel without data collisions.

### Why Smart Waits instead of `waitForTimeout`?
**Problem**: Static waits make tests flaky (too slow in CI, too fast locally).
**Solution**: Wait for actual conditions (`waitForSelector`, `waitForFunction`).
**Benefit**: Tests run as fast as the app allows, never slower.

### Why Separate Positive/Negative Methods?
**Problem**: Same `login()` method waits for dashboard even for invalid credentials.
**Solution**: `loginSuccess()` waits for UI, `loginFail()` only submits form.
**Benefit**: Negative tests run faster and don't timeout waiting for UI that never appears.

### Why `data-test-ready` Attributes?
**Problem**: No reliable way to know when animations complete.
**Solution**: Modified HTML to set `data-test-ready="true"` when UI is stable.
**Benefit**: Test waits for explicit signal, not arbitrary timeout.

### Why `clearSession()` between Cycles?
**Problem**: Multiple login/logout cycles cause state leakage.
**Solution**: Clear cookies and localStorage between iterations.
**Benefit**: Each cycle starts with fresh state, no cross-contamination.

## 🔧 Challenges Solved

### Challenge 1 - Multiple Logins
| Problem | Solution |
|---------|----------|
| Hardcoded test data | Dynamic `TestDataFactory.generateMultipleUsers(3)` |
| `waitForTimeout(2000)` | Wait for `data-test-ready` attribute |
| XPath `//*[@href...]` | CSS selector `a[href="/challenge1.html"]` |
| Email/password not captured | Added `#emailDisplay` and `#passwordDisplay` elements |

### Challenge 2 - Animated Form
| Problem | Solution |
|---------|----------|
| Menu not clickable immediately | Wait for `data-initialized="true"` attribute |
| No error message for invalid login | Added `#errorMessage` div |
| Negative test waiting for dashboard | Separate `loginFail()` method |
| Dropdown menu timing | `waitForSelector('#accountMenu.show')` |

### Challenge 3 - Forgot Password
| Problem | Solution |
|---------|----------|
| `setTimeout` delays | Removed, direct DOM updates |
| Case-sensitive heading check | Regex `/success/i` |
| Modal not visible before interaction | `waitForSelector('input#email')` |

### Challenge 4 - Global State
| Problem | Solution |
|---------|----------|
| Ignored ready state hint | `waitForFunction(() => window.isAppReady === true)` |
| No logout verification | Assert email input visible after logout |
| Race condition on page load | Page-specific `waitForPageReady` flag |

## 📊 Before vs After

| Aspect | Original Code | My Solution |
|--------|---------------|-------------|
| Selectors | XPath `//*[@href...]` | CSS + `getByRole` |
| Test Data | Hardcoded `test1@example.com` | Dynamic `TestDataFactory` |
| Waits | `waitForTimeout(2000)` | `waitForSelector` + `waitForFunction` |
| Structure | All in one test file | Page Object Model |
| Negative Tests | `login()` times out | `loginFail()` no wait |
| Global State | Ignored | `waitForFunction(() => window.isAppReady)` |
| Parallel Ready | ❌ No | ✅ Yes |
| CI Stable | ❌ Flaky | ✅ Stable |

### ✅ Enterprise Features

- **Page Object Model** – Single source of truth for selectors
- **Smart Wait Helpers** – No `waitForTimeout`, only condition-based waits
- **No XPath** – Role-based + CSS selectors only
- **Dynamic Test Data** – Parallel execution ready
- **GitHub Actions** – CI/CD with matrix strategy
- **Test Tags** – `@smoke` and `@regression` for filtering

---

## 🛠️ Technologies

| Technology | Version |
|------------|---------|
| Playwright | ^1.42.1 |
| TypeScript | ^5.3.3 |
| Node.js | 18+ |
| Express | ^4.22.1 |

---

## 📁 Project Structure
```
anaconda-qa-assessment/
│
├── .github/workflows/
│ ├── smoke.yml
│ └── regression.yml
│
├── src/
│ ├── pages/
│ │ ├── BasePage.ts
│ │ ├── Challenge1Page.ts
│ │ ├── Challenge2Page.ts
│ │ ├── Challenge3Page.ts
│ │ └── Challenge4Page.ts
│ │
│ └── utils/
│ ├── waitHelpers.ts
│ └── testDataFactory.ts
│
├── tests/
│ ├── smoke/
│ └── regression/
│
├── public/
│ ├── challenge1.html
│ ├── challenge2.html
│ ├── challenge3.html
│ └── challenge4.html
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── server.js
└── README.md
```


## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/GitHubMaster07/anaconda-qa-assessment.git
cd anaconda-qa-assessment

# Install
npm install
npx playwright install

# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression
```
## 🧪 Test Results

| Suite | Tests | Status |
|-------|-------|--------|
| Smoke | 8 | ✅ All passing |
| Regression | 30 | ✅ All passing |
| CI/CD | - | ✅ Green |


 ## 🔄 CI/CD Pipelines

| Pipeline | Trigger | Duration |
|----------|---------|----------|
| Smoke | Every push/PR | ~2 min |
| Regression | Nightly (3 AM) | ~1.5 min |
``` 

## 📊 Test Commands
```
npm run test:smoke      # Fast critical path
npm run test:regression # Full test suite
npm run test:headed     # With browser UI
npm run test:debug      # Debug mode
```

## 👤 Author
Sergey Volodin
GitHub: @GitHubMaster07

## 📄 License
MIT

