class DemoqaPage{
  clickCategoryCard(card){
    cy.contains('h5',card).click();
  }
}