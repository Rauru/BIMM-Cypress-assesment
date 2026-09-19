Cypress.Commands.add('goToHomepage', () => {
  cy.visit('https://demoqa.com');
});

Cypress.Commands.add('typeAsUser', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).click();
  cy.then(async () => {
    for (const key of String(text)) {
      await Cypress.automation('remote:debugger:protocol', {
        command: 'Input.dispatchKeyEvent',
        params: { type: 'keyDown', key, text: key, unmodifiedText: key },
      });
      await Cypress.automation('remote:debugger:protocol', {
        command: 'Input.dispatchKeyEvent',
        params: { type: 'keyUp', key },
      });
    }
  });
  return cy.wrap(subject).should('have.value', String(text));
});

// Runs the axe-core accessibility engine on part of the page and fails on violations of
// the given impact levels. axe-core is used directly because cypress-axe does not support
// Cypress 16 yet. knownIssues lists rule ids that are already reported as defects: they are
// still logged, but only new violations fail the test.
Cypress.Commands.add(
  'checkAccessibility',
  (context, { impacts = ['critical', 'serious'], knownIssues = [] } = {}) => {
    cy.readFile('node_modules/axe-core/axe.min.js', { log: false }).then((axeSource) => {
      cy.window({ log: false }).then(async (win) => {
        if (!win.axe) win.eval(axeSource);
        const { violations } = await win.axe.run(win.document.querySelector(context));
        const relevant = violations.filter((v) => impacts.includes(v.impact));
        relevant.forEach((v) => {
          const known = knownIssues.includes(v.id);
          Cypress.log({
            name: known ? 'a11y (known)' : 'a11y',
            message: `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} element(s))`,
            consoleProps: () => ({
              rule: v.id,
              helpUrl: v.helpUrl,
              elements: v.nodes.map((n) => n.target),
            }),
          });
        });
        const newViolations = relevant.filter((v) => !knownIssues.includes(v.id));
        const summary = newViolations
          .map((v) => `${v.id} (${v.impact}, ${v.nodes.length})`)
          .join(', ');
        expect(
          newViolations,
          `new accessibility violations in ${context}: ${summary || 'none'}`,
        ).to.have.length(0);
      });
    });
  },
);
