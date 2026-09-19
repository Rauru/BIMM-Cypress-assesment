const exactText = (text) => new RegExp(`^${Cypress._.escapeRegExp(text)}$`);

const selectors = {
  categoryCard: '.top-card',
  menuItem: '.menu-list .text',
};

class DemoqaPage{

  checkCardIsVisible(card) {
     cy.contains(selectors.categoryCard, exactText(card)).should('be.visible');
     return this;
  }

  clickCategoryCard(card){
    cy.contains(selectors.categoryCard, exactText(card)).click();
    return this;
  }

  checkMenuItemIsVisible(name){
    cy.contains(selectors.menuItem, exactText(name)).should('be.visible');
    return this;
  }

  clickMenuItem(name){
    cy.contains(selectors.menuItem, exactText(name)).click();
    return this;
  }
}

export default DemoqaPage;
