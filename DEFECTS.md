# Defects

Found on https://demoqa.com/automation-practice-form, September 2026, Chrome and Electron (Cypress 16).

**Severity** = impact on the user. **Priority** = how soon it should be fixed.

---

## DEF-1: Valid emails with long domain endings are rejected

**Severity:** Medium · **Priority:** Medium

**Steps to reproduce**

1. Go to https://demoqa.com/automation-practice-form.
2. Fill in the required fields:
   - **First Name:** `John`
   - **Last Name:** `Doe`
   - **Gender:** select `Male`
   - **Mobile:** `5551234567`
3. In **Email**, type `john.doe@example.museum`.
4. Click **Submit**.

**Expected:** the "Thanks for submitting the form" dialog opens; `.museum` is a valid domain ending.

**Actual:** the Email field turns red with a warning icon and the dialog does not open. `john.doe@example.photography` is also rejected, while `john.doe@example.co.uk` is accepted.

**Evidence:** [`docs/evidence/email-museum-rejected.png`](docs/evidence/email-museum-rejected.png). The input's `pattern` attribute only allows 2–5 letters after the last dot: `…\.([a-zA-Z]{2,5})$`.

**Rationale:** real users with valid addresses (`.museum`, `.photography`, `.technology`, …) cannot register and have no workaround except using a different email. It affects a minority of users, so it is not High.

---

## DEF-2: Form inputs have no accessible label

**Severity:** High · **Priority:** High

**Steps to reproduce**

1. Go to https://demoqa.com/automation-practice-form.
2. Open Chrome DevTools (`F12`) and go to the **Elements** tab.
3. Press `Ctrl+F` and search for `label[for="dateOfBirthInput"]`: **0 results**.
4. Repeat the search for `label[for="subjectsInput"]` and `label[for="uploadPicture"]`: **0 results** each.
5. To see the full list, run the accessibility spec: `npx cypress run --spec cypress/e2e/accessibility-test.cy.js --headed` and read the `a11y (known)` entries in the command log.

**Expected:** every input is linked to its visible label (`<label for="…">` or `aria-label`), so assistive technology can announce what the field is.

**Actual:** 4 inputs have no linked label, so assistive technology has no name to announce for them.

| Field         | Input                                     |
| ------------- | ----------------------------------------- |
| Date of Birth | `#dateOfBirthInput`                       |
| Subjects      | `#subjectsInput`                          |
| Picture       | `#uploadPicture`                          |
| State         | `#react-select-3-input` (inside `#state`) |

**Evidence:** axe-core reports rule `label` (critical) for all 4 inputs and `label-title-only` (serious) for Subjects and State. [`cypress/e2e/accessibility-test.cy.js`](cypress/e2e/accessibility-test.cy.js) logs them on every run.

**Rationale:** screen reader users cannot tell what these fields are for, and it fails WCAG 2 Level A (4.1.2 Name, Role, Value), which is a legal risk for real products. The fix is small (add `for` or `aria-label`).

---

## DEF-3: Same `id` used on three labels

**Severity:** Low · **Priority:** Low

**Steps to reproduce**

1. Go to https://demoqa.com/automation-practice-form.
2. Open Chrome DevTools (`F12`) and go to the **Console** tab.
3. Run `document.querySelectorAll('#subjects-label').length`: it returns **3**.
4. Run `[...document.querySelectorAll('#subjects-label')].map((l) => l.textContent)`: it returns `["Subjects", "Hobbies", "Picture"]`.

**Expected:** each `id` is unique on the page, so the command returns 1.

**Actual:** the Subjects, Hobbies and Picture labels all have `id="subjects-label"`.

**Rationale:** no visible impact, but duplicate IDs are invalid HTML, break anything that looks elements up by ID, and are part of why DEF-2 exists (the labels cannot be referenced reliably). Best fixed together with DEF-2.
