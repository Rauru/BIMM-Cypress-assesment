class DemoqaPage{
  
  checkCardIsVisible(card) { 
     cy.contains('.top-card', card).should('be.visible');
     return this;
  }

  clickCategoryCard(card){
    cy.contains('.top-card', card).click();
    return this;
  }
  
  checkDropdownIsVisible(name){
    cy.contains('.menu-list .text', name).should('be.visible');
    return this;
  }

  clickDropdown(nme){
    cy.contains('.menu-list .text', name).click();
    return this;
  }
   
}

export default DemoqaPage;