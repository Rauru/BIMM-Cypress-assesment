# DemoQA Cypress Automation Suite

Cypress + JavaScript tests for [demoqa.com](https://demoqa.com): forms, selections, dialogs and accessibility checks (15 tests).

## Documents

- [Summary report](docs/SUMMARY.md): approach, results, flakiness handling and recommendations
- [Defects](docs/DEFECTS.md): defects found, with steps to reproduce and evidence
- [Test report](docs/test-report.html): HTML report from a full run (15/15 passed); download it and open it in a browser

## Completed tasks

- [x] **Framework setup:** Cypress + JavaScript, page objects, fixtures and utilities, one-command run (`npm test`), base URL and timeouts in config
- [x] **Code quality:** ESLint and Prettier
- [x] **Automated tests:** 15 tests covering forms, selections and dialogs, with edge cases
- [x] **Data-driven tests:** fixture data and a random data generator
- [x] **Flakiness handling:** condition-based waits, retries, blocked ad hosts
- [x] **Accessibility checks:** axe-core scans of the Practice Form and a modal
- [x] **Execution and analysis:** HTML test report and a results summary
- [x] **Defect reporting:** 3 defects in [DEFECTS.md](docs/DEFECTS.md)
- [x] **Recommendations:** in the [summary report](docs/SUMMARY.md)
- [x] **CI:** GitHub Actions runs lint, format check and the suite in Chrome on every push

## Prerequisites

- Node.js 22+
- A Chromium browser (Electron, bundled with Cypress, is used by default)

## Install

```bash
git clone https://github.com/Rauru/BIMM-Cypress-assessment.git
cd BIMM-Cypress-assessment
npm install
```

## Run

| Command               | Description                            |
| --------------------- | -------------------------------------- |
| `npm test`            | Run all tests headless                 |
| `npm run test:headed` | Run all tests with the browser visible |
| `npm run cy:open`     | Open the interactive Cypress app       |
| `npm run lint`        | Lint with ESLint                       |

## Results

Each `npm test` run writes an HTML report to `cypress/reports/index.html` with screenshots of any failures. It is regenerated on every run and not committed; a snapshot from a full run is saved at [docs/test-report.html](docs/test-report.html).

## Structure

- `cypress/e2e/` specs
- `cypress/fixtures/` test data
- `cypress/support/` custom commands and helpers
- `page-controllers/base-controllers/` page objects (selectors)
- `page-controllers/domain-controllers/` business flows built on the page objects

## Known limitations

- Firefox is not supported: the Mobile field is typed via Chrome DevTools input (`typeAsUser`) so the browser enforces `minlength`.
- Known accessibility defects on the Practice Form (`label`, `label-title-only`) are allowed; any new violation fails.
- Tests run against the live site, so site changes can affect results.
