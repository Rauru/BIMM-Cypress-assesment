// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('goToHomepage', () => {
    cy.visit('https://demoqa.com');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Types through Chrome's real keyboard input (DevTools protocol) instead of cy.type()'s
// simulated events. The browser only enforces minlength on text a user actually typed,
// so fields validated by minlength need this. Works in Chromium browsers (Chrome, Edge, Electron).
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
