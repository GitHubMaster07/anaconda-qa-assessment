# 🎯 Anaconda QA Assessment

[![Smoke Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml)
[![Regression Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml)

**QA Automation Engineer skills demonstration – Production-grade Playwright automation framework**

> Built for Anaconda AI platform team interview | Senior QA Engineer level

---

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

### 4 Testing Challenges Solved

| Challenge | Description | Key Fix |
|-----------|-------------|---------|
| 1 | Multiple login attempts | Dynamic test data, proper assertions |
| 2 | Animated form login/logout | Smart waits, stability detection |
| 3 | Forgot password flow | Modal handling, resilient assertions |
| 4 | Global application state | `waitForFunction` for ready state |

### Enterprise Features

- Page Object Model – Maintainable selectors
- Smart Wait Helpers – No `waitForTimeout`
- No XPath – Role-based + CSS selectors
- Dynamic Test Data – Parallel execution ready
- GitHub Actions – Full CI/CD pipeline

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
│ ├── smoke.yml # Runs on every push
│ └── regression.yml # Runs nightly at 3 AM
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
│ ├── smoke/ # 8 critical tests
│ └── regression/ # 30 full regression tests
│
├── public/ # HTML test files
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

```

---

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
Suite	Tests	Status
Smoke	8	     ✅ All passing
Regression	30	 ✅ All passing
CI/CD	-	     ✅ Green

## 🔧 Key Fixes Applied
Challenge 1 - Multiple Logins
 - Dynamic unique users per test run
 - data-test-ready attribute for animation completion

Challenge 2 - Animated Form
 - Separated loginSuccess() and loginFail() methods
 - Error message element added to HTML

Challenge 3 - Forgot Password
 - Removed setTimeout delays
 - data-test-ready attribute on success message

Challenge 4 - Global State
 - Waits for window.isAppReady flag
 - Page-specific ready state handling

 ## 🔄 CI/CD Pipelines
Pipeline	   Trigger	           Duration
Smoke	       Every push/PR	   ~2 min
Regression	   Nightly (3 AM)	   ~1.5 min

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

