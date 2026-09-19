# DemoQA Cypress Automation Suite

Cypress + JavaScript tests for [demoqa.com](https://demoqa.com): forms, selections, dialogs and accessibility checks (15 tests).

## Documents

- [Summary report](docs/SUMMARY.md): approach, results, flakiness handling and recommendations
- [Defects](docs/DEFECTS.md): defects found, with steps to reproduce and evidence

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

Each `npm test` run writes an HTML report to `cypress/reports/index.html` with screenshots of any failures. It is regenerated on every run and not committed.

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
