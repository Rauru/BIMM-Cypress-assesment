/// <reference types="cypress" />


describe('Test forms elements functionality', ()=>{
    let Homepage
    beforeEach(()=>{
        cy.goToHomepage();
        Homepage = new Homepage();
    })

    it('Check form submissison with static text', ()=>{
        Homepage.clickCategoryCard('Forms');
        cy.get('.element-list').contains('Text Box').click(); 
    })

})