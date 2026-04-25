# anaconda-qa-assessment
QA Automation Engineer skills demonstration – Playwright UI challenge

# Anaconda QA Assessment – Sergei Volodin

## Setup

```bash
npm install
npx playwright install
npm test

cat > README.md << 'EOF'
# 🎯 Anaconda QA Assessment - Playwright Enterprise Solution

[![Playwright Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml)
[![Nightly Regression](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/nightly.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/nightly.yml)

**QA Automation Engineer skills demonstration – Production-grade Playwright automation framework**

> 🏆 Built for Anaconda AI platform team interview | Demonstrates Senior QA Engineer level

---

## 📋 Table of Contents

- [Overview](#overview)
- [What This Repo Contains](#what-this-repo-contains)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [CI/CD Pipelines](#cicd-pipelines)
- [Test Organization](#test-organization)
- [Enterprise Features](#enterprise-features)
- [Challenges Solved](#challenges-solved)
- [Future Improvements](#future-improvements)

---

## 📖 Overview

This repository demonstrates **production-ready test automation** for the Playwright Testing Challenges. It showcases enterprise-level patterns, CI/CD integration, and solutions to common testing anti-patterns (flaky tests, race conditions, poor selectors).

| Aspect | Implementation |
|--------|----------------|
| **Framework** | Playwright + TypeScript |
| **Pattern** | Page Object Model (POM) |
| **CI/CD** | GitHub Actions (4 pipelines) |
| **Parallelization** | 4-8 workers with sharding |
| **Test Types** | Smoke, Regression, Performance |

---

## 📦 What This Repo Contains

### ✅ Complete Solution for 4 Testing Challenges

| Challenge | Description | Key Fixes Applied |
|-----------|-------------|-------------------|
| **Challenge 1** | Multiple login attempts | Dynamic test data, proper assertions |
| **Challenge 2** | Animated form login/logout | Smart waits, stability detection |
| **Challenge 3** | Forgot password flow | Modal handling, resilient assertions |
| **Challenge 4** | Global application state | `waitForFunction` for ready state |

### ✅ Enterprise Infrastructure

- **Page Object Model** – Maintainable, reusable selectors
- **Smart Wait Helpers** – No `waitForTimeout` or static delays
- **No XPath** – Role-based + CSS selectors only
- **Dynamic Test Data** – Parallel execution ready
- **GitHub Actions** – Complete CI/CD pipeline

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | ^1.42.1 | Browser automation |
| **TypeScript** | ^5.3.3 | Type safety |
| **Node.js** | 18+ | Runtime |
| **GitHub Actions** | Latest | CI/CD |

---

## 📁 Project Structure
```
anaconda-qa-assessment/
│
├── .github/workflows/ # CI/CD pipelines
│ ├── smoke.yml # Every commit (~2 min)
│ ├── nightly.yml # 3 AM daily (~30 min)
│ ├── performance.yml # Weekly load tests
│ └── security.yml # Daily secret scanning
│
├── src/
│ ├── pages/ # Page Object Model
│ │ ├── BasePage.ts # Core with smart waits
│ │ ├── Challenge1Page.ts # Multiple login tests
│ │ ├── Challenge2Page.ts # Animated form handling
│ │ ├── Challenge3Page.ts # Forgot password flow
│ │ └── Challenge4Page.ts # Global state management
│ │
│ ├── utils/ # Helpers
│ │ ├── waitHelpers.ts # No static waits
│ │ ├── testDataFactory.ts # Dynamic data
│ │ ├── parallelRunner.ts # Test distribution
│ │ └── logger.ts # Professional logging
│ │
│ ├── config/
│ │ ├── environments.ts # Dev/Staging/Prod
│ │ └── testGroups.ts # Smoke/Regression tags
│ │
│ └── types/
│ └── index.ts # TypeScript interfaces
│
├── tests/
│ ├── smoke/ # Critical journeys @smoke
│ ├── regression/ # Full suites @regression
│ ├── performance/ # Load tests @performance
│ └── helpers/ # testTags, groupRunner
│
├── test-data/ # JSON fixtures
│ ├── valid-users.json
│ ├── invalid-users.json
│ └── edge-cases.json
│
├── playwright.config.ts # Parallel execution ready
├── tsconfig.json # Strict TypeScript
├── package.json # Dependencies
└── README.md # This file
```


---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed

### Setup

```bash
# Clone the repository
git clone https://github.com/GitHubMaster07/anaconda-qa-assessment.git
cd anaconda-qa-assessment

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment variables
cp .env.example .env