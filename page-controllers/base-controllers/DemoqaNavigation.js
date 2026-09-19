const exactText = (text) => new RegExp(`^${Cypress._.escapeRegExp(text)}$`);

class DemoqaPage{

  checkCardIsVisible(card) {
     cy.contains('.top-card', exactText(card)).should('be.visible');
     return this;
  }

  clickCategoryCard(card){
    cy.contains('.top-card', exactText(card)).click();
    return this;
  }

  checkMenuItemIsVisible(name){
    cy.contains('.menu-list .text', exactText(name)).should('be.visible');
    return this;
  }

  clickMenuItem(name){
    cy.contains('.menu-list .text', exactText(name)).click();
    return this;
  }
}

export default DemoqaPage;
