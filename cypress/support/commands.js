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
