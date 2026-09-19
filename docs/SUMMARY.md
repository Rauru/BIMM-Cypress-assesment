# Summary Report

## Approach

I focused on the three areas named in the brief (forms, selections, dialogs) and chose fewer, meaningful tests: a happy path for each area plus the edge cases most likely to hide bugs. Accessibility checks were added as an extra.

**Coverage (15 tests):** Practice Form (6: fixture data, random data, empty submit, invalid email, 9-digit mobile, City disabled until a State is chosen), radio buttons (3), small and large modals closed two ways (4), axe-core accessibility scans (2).

## Key design decisions

- **Three-layer Page Object Model:** specs → business flows (`domain-controllers`) → page objects (`base-controllers`). Each page object keeps its selectors in one `selectors` object, and specs never contain selectors.
- **Every test starts on the homepage** and navigates through the card and side menu, as a user would.
- **Resilient selectors:** meaningful IDs, exact visible text (a shared `exactText` helper, so "Male" never matches "Female") and `role="option"`, never generated `css-*` classes.
- **Assertions that can fail:** key checks were confirmed by breaking them on purpose. "Modal closed" checks first confirm the modal opened, since a `not.exist` check also passes when nothing appeared.
- **Test data:** a static fixture plus a random generator; random values are logged so failures can be reproduced.

## Trade-offs

- **JavaScript over TypeScript:** kept the focus on coverage; ESLint catches bugs like uncalled assertions.
- **`axe-core` directly instead of `cypress-axe`:** `cypress-axe` does not support Cypress 16 yet, and forcing it would break `npm install`.
- **Known accessibility defects allowed per rule:** keeps the suite green while still failing on new violations, but a new element with the same rule violation would not be caught.
- **Navigating from the homepage** is more realistic but makes every test depend on the menu working.

## Results

| Run                                 | Result                                   |
| ----------------------------------- | ---------------------------------------- |
| Local, `npm test` (Electron)        | 15/15 passed, ~25–28s                    |
| Local, 3 runs with retries disabled | 15/15 passed every run                   |
| Local stability, 10 runs (13 tests) | 10/10 green, no retries needed           |
| GitHub Actions (Chrome, Ubuntu)     | Passed, including lint and format checks |

The HTML report is generated at `cypress/reports/index.html` and uploaded by CI. Three defects are documented in [DEFECTS.md](DEFECTS.md).

## Flakiness and how it was handled

- **Modal fade-in:** an accessibility scan failed once and passed on retry. Scanning right after opening reproduced a colour-contrast failure 15/15 times at 5–33% opacity. **Fix:** wait until the modal is fully opaque; the same 15 scans then found no violations. The retry had hidden a real timing problem.
- **`cy.type()` bypasses `minlength`:** a 9-digit mobile was accepted in Cypress but rejected when typed for real, so the rejection test failed and reported a validation bug that does not exist. **Fix:** a `typeAsUser` command that types through Chrome's real keyboard input.
- **Ads:** DemoQA loads ~30 third-party ad and analytics domains. They caused no failures in 10 runs, but blocking them with `blockHosts` made runs ~17% faster (30s → 25s) and reduces the risk of ad scripts throwing errors or covering elements.
- **No fixed waits:** every wait is on a condition (element state, opacity, URL).

## Recommendations

- **CI/CD:** run on every pull request (already set up with GitHub Actions) and block merging on failure; add a nightly run against the live site.
- **Suite organization:** tag tests as `@smoke` (navigation plus one happy path per area) and `@regression`; run smoke on every push, the full suite nightly.
- **Parallelization:** split specs across CI machines (e.g. a GitHub Actions matrix) as the suite grows.
- **Test data:** keep fixtures per feature and generate unique data per run to avoid collisions in shared environments.
- **Testability:** ask developers for `data-testid` attributes and properly labelled inputs; both make selectors simpler and fix DEF-2.
- **Metrics:** pass rate, **retry rate** (the modal flake showed retries can hide problems), duration per spec, and number of accessibility violations over time.
