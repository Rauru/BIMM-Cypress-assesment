// Exact text match for cy.contains: 'Male' matches only "Male", not "Female".
// Special characters are escaped so names like "Alerts, Frame & Windows" match literally.
export const exactText = (text) => new RegExp(`^${Cypress._.escapeRegExp(text)}$`);
