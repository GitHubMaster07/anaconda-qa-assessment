
# 🎯 Anaconda QA Assessment

[![Smoke Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml)
[![Regression Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml)
[![Performance Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/performance.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/performance.yml)

![Tests](https://img.shields.io/badge/tests-52_total-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

---

## 📌 Context

This project is a **solution to a QA automation challenge** provided by
Anaconda, Inc.
based on the repository
playwright-challenges.

The goal was not just to make tests pass, but to transform a **flaky, non-scalable test suite** into a **stable, maintainable automation framework** using real-world engineering practices.

---

## 🚀 TL;DR (for reviewers)

* ✅ Flaky tests stabilized (removed hard waits)
* ✅ Parallel-safe (dynamic test data)
* ✅ CI pipelines (smoke / regression / performance)
* ✅ UI + API + Accessibility + Performance coverage
* ⚠️ Accessibility issues intentionally exposed (not hidden)
* ⚠️ Performance tests are non-deterministic → non-blocking
* ⚠️ Some testability hooks added for demo purposes (see limitations)

---

## 💼 Business Value

* Faster feedback loop: **~2 min smoke suite**
* Reduced regression risk in critical flows (auth, global state)
* Improved CI reliability → fewer false failures
* Clear debugging artifacts → faster triage
* Scalable foundation for growing test coverage

---

## 📖 Overview

This project demonstrates how to evolve a basic test suite into a **production-oriented automation framework**.

| Problem              | Solution                                 |
| -------------------- | ---------------------------------------- |
| Flaky tests          | Smart waits + explicit readiness signals |
| Hardcoded test data  | Dynamic TestDataFactory                  |
| Poor structure       | Page Object Model                        |
| CI instability       | Retry strategy + pipeline separation     |
| Debugging difficulty | Traces, videos, screenshots              |

---

## 🧠 Architecture Decisions

### Page Object Model (POM)

Centralized UI logic and selectors.

**Trade-off:**
Simple and readable, but less flexible than Screenplay pattern.

---

### Dynamic Test Data

Generated via `crypto.randomUUID()`.

**Impact:**
Safe parallel execution without collisions.

---

### Smart Waiting Strategy

Replaced `waitForTimeout` with:

* `waitForSelector`
* `waitForFunction`

**Impact:**
Reduced flakiness and improved execution speed.

---

### Explicit Readiness Signals

* `data-test-ready`
* `window.isAppReady`

**Important:**
These were added for demonstration purposes to simulate real-world testability improvements.

---

## 🧪 Test Strategy

### Risk-Based Coverage

| Area           | Risk   | Coverage  |
| -------------- | ------ | --------- |
| Authentication | High   | UI + API  |
| Global State   | High   | UI        |
| API            | High   | API       |
| Forms          | Medium | UI        |
| Accessibility  | Medium | Automated |
| Performance    | Medium | Synthetic |

---

### Test Pyramid (Current)

* API: 16 tests
* UI: 44 tests
* Other: 14 tests

⚠️ UI-heavy — acceptable for demo, but API coverage should dominate in real projects.

---

### Retry Policy

```ts
retries: 1 // CI only
```

---

## 🔌 API Testing

Covered endpoints:

* `POST /api/login`
* `POST /api/forgot-password`
* `GET /api/profile`

Includes:

* Positive/negative cases
* Validation checks
* Auth behavior

---

## ♿ Accessibility Testing

Using axe-core (WCAG 2.1 AA).

Detected real issues:

* Low color contrast
* Missing landmarks
* Missing H1

⚠️ Important:

Accessibility violations are **reported but not blocking CI**,
as they originate from the provided challenge HTML.

---

## ⚡ Performance Testing

Measured flows:

* Page load
* Login

| Metric | Target | Status      |
| ------ | ------ | ----------- |
| Load   | <2s    | ✅           |
| Login  | <3s    | ⚠️ variable |

⚠️ Notes:

* CI environments are noisy
* Tests run weekly and are non-blocking
* Intended for trend monitoring, not strict gating

---

## 🔍 Observability & Debugging

On every failure:

* 📸 Screenshot
* 🎥 Video
* 🔍 Playwright trace
* 📝 Console logs

This significantly reduces time to identify root cause.

---

## 🐳 Docker Support

```bash
docker build -t playwright-tests .
docker run --rm playwright-tests
```

Ensures consistency between local and CI environments.

---

## 📊 Reporting (Allure)

```bash
npm run allure:report
```

Includes:

* Execution timeline
* Failure artifacts
* Historical trends (if enabled)

---

## 🔧 Environment Configuration

```bash
npm run test:dev
npm run test:staging
npm run test:prod
```

Uses `.env.*` files.

Secrets should be stored in CI (e.g., GitHub Secrets).

---

## 📁 Project Structure

```
src/
  pages/
  utils/

tests/
  api/
  smoke/
  regression/
  accessibility/
  performance/
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/GitHubMaster07/anaconda-qa-assessment.git
cd anaconda-qa-assessment

npm install
npx playwright install

npm run test:smoke
```

---

## 🧪 Test Results

| Suite              | Status               |
| ------------------ | -------------------- |
| Core (52 tests)    | ✅ Stable             |
| Accessibility (10) | ⚠️ Issues detected   |
| Performance (4)    | ⚠️ Non-deterministic |

---

## 🔄 CI/CD Pipelines

| Pipeline    | Trigger | Blocking |
| ----------- | ------- | -------- |
| Smoke       | PR      | ✅        |
| Regression  | Nightly | ⚠️       |
| Performance | Weekly  | ❌        |

---

## ⚠️ Limitations & Trade-offs

* Some DOM attributes were added to improve testability (demo purpose)
* No test data cleanup (acceptable for isolated test environment)
* No contract testing (API schema validation not included)
* Limited security testing (no rate-limit / token edge cases)
* No historical performance tracking (only snapshot checks)

---

## 🔮 Future Improvements

* Add contract testing (schema validation)
* Introduce test data cleanup via API
* Expand API coverage (reduce UI dependency)
* Add visual regression testing
* Add flaky test tracking metrics
* Integrate notifications (Slack, etc.)

---

## 👤 Author

Sergey Volodin
GitHub: GitHubMaster07

---

## 📄 License

MIT
