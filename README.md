# 🎯 Anaconda QA Assessment

[![Smoke Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/smoke.yml)
[![Regression Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/regression.yml)
[![Performance Tests](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/performance.yml/badge.svg)](https://github.com/GitHubMaster07/anaconda-qa-assessment/actions/workflows/performance.yml)

![Tests](https://img.shields.io/badge/tests-88_total-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

---

## 📌 Context

This project is a **solution to a QA automation challenge** provided by Anaconda, Inc., based on the repository `playwright-challenges`.

The goal was not just to make tests pass, but to transform a **flaky, non-scalable test suite** into a **production-oriented, maintainable automation framework** using real-world engineering practices.

---

## 🎯 Scope of the Challenge

The original challenge application has several limitations:

- No backend API (UI-only architecture)
- No accessibility compliance (multiple WCAG violations)
- Non-deterministic UI behavior in some flows
- Limited testability hooks

👉 Therefore, this project focuses on:

- Building a **scalable test framework**
- Demonstrating **test architecture and patterns**
- Showing **how to detect and report quality issues**, not just pass tests

⚠️ Important:
Some tests are intentionally failing to highlight real issues in the application.

## 🚀 TL;DR (for reviewers)

* ✅ Flaky tests stabilized (removed hard waits)
* ✅ Parallel-safe (dynamic test data)
* ✅ CI pipelines (smoke / regression / performance)
* ✅ UI + API + Accessibility + Performance + Security coverage
* ✅ Contract testing (Zod schemas)
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

This project demonstrates how to evolve a basic test suite into a **production-grade quality engineering framework**.

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

* `window.isAppReady`

⚠️ **Note:** Added for demonstration purposes.
In real production systems, alternatives would include network-based synchronization or event listeners.

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

* API: 30 tests
* UI: 44 tests
* Other: 14 tests

⚠️ UI-heavy — acceptable for demo, but API coverage should dominate in real projects.

---

### Retry Policy

```ts
retries: 1 # Retries are a safety net, not a solution. Root causes were addressed via proper waits and state control.
```

---

### 🧹 Test Data Lifecycle

The framework implements a cleanup pattern for test data:

```typescript
test.afterEach(async ({ request }) => {
  if (createdEmail) {
    await CleanupHelper.cleanupAll(request);
  }
});
```

**Note:**
Current implementation logs cleanup intent.
In a real project, this would remove records via API/database.

---

## 🔌 API Testing

16 API tests covering backend validation with **contract testing**:

| Endpoint                  | Tests | Contract Validation           |
| ------------------------- | ----- | ----------------------------- |
| POST /api/login           | 3     | ✅ Zod schema (token format)   |
| POST /api/forgot-password | 3     | ✅ Zod schema (message format) |
| GET /api/profile          | 2     | ✅ Zod schema (user object)    |

---

### Contract Testing with Zod

Each API response is validated against a schema:

```typescript
const loginSuccessSchema = z.object({
  token: z.string().min(1)
});

const validation = loginSuccessSchema.safeParse(response);
expect(validation.success).toBe(true);
```

---

## 🔒 Security Testing

Security tests validate:

| Threat           | Test Coverage                 |
| ---------------- | ----------------------------- |
| SQL Injection    | Login & forgot password       |
| XSS              | Email sanitization            |
| Brute force      | Rate limiting detection       |
| Token validation | Invalid / missing / malformed |

⚠️ These tests run in CI but do not block the pipeline.

---

### ♿ Accessibility Testing (Important Context)

Accessibility tests are expected to fail.

This is intentional — the provided application contains real WCAG violations:

- Missing landmarks
- No `<main>` region
- No `<h1>` heading
- Color contrast issues

👉 The goal is to **surface these issues**, not hide them.

In real production:
- these tests would block releases
- or be triaged with the development team

⚠️ Reported but not blocking CI (issues originate from challenge HTML).

---

### ⚠️ Test Stability Considerations

Due to limitations of the challenge app:

- Some flows are non-deterministic (e.g. Challenge 3)
- Performance tests may fail in CI due to environment variability

👉 These cases are intentionally left visible to demonstrate:
- detection of instability
- need for better app instrumentation
- importance of deterministic UI signals

---

## 🔍 Observability & Debugging

On every failure:

* 📸 Screenshot
* 🎥 Video
* 🔍 Playwright trace
* 📝 Console logs

👉 Enables fast root cause analysis in CI.

---

## 📊 Flaky Test Management

The framework includes:

* Retry mechanism
* Flaky detection strategy
* Monitoring thresholds

---

## 📊 Flaky Test Management (Planned)

> *Note:* Removed due to Playwright API compatibility constraints.

```typescript
export function flakyTest(name, body, options) {
  // Retry logic
  // Flaky tagging
  // Notifications
}
```

---

## 📈 CI Insights & Metrics

Tracks:

* Test duration trends
* Success rate over last runs
* Flaky test detection
* Performance degradation

Available via GitHub Actions artifacts.

---

## 🐳 Docker Support

```bash
docker build -t playwright-tests .
docker run --rm playwright-tests
```

Ensures consistent execution across environments.

---

## 📊 Reporting (Allure)

```bash
npm run allure:report
```

Includes:

* Execution timeline
* Failure artifacts
* Historical trends

---

## 🔧 Environment Configuration

```bash
npm run test:dev
npm run test:staging
npm run test:prod
```

Uses `.env.*` files.

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

| Suite           | Status               |
| --------------- | -------------------- |
| Core (52 tests) | ✅ Stable             |
| Accessibility   | ⚠️ Issues            |
| Performance     | ⚠️ Non-deterministic |

---

## 🔄 CI/CD Pipelines

| Pipeline    | Trigger | Blocking |
| ----------- | ------- | -------- |
| Smoke       | PR      | ✅        |
| Regression  | Nightly | ⚠️       |
| Performance | Weekly  | ❌        |

---

## ⚠️ Limitations & Trade-offs

* Used existing application signals instead of introducing test-only hooks.
* Cleanup is simulated (no real API delete)
* Security tests are non-blocking
* Performance tests are environment-dependent
* No full contract coverage (partial via Zod)

---

## 🔮 Future Improvements

* Expand contract testing coverage
* Add real data cleanup APIs
* Increase API vs UI ratio
* Add visual regression testing
* Implement flaky tracking fully
* Add Slack/alerting integration

---

## 👤 Author

Sergey Volodin
GitHub: https://github.com/GitHubMaster07

---

## 📄 License

MIT
