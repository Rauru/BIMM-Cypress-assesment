import Homepage from '../../page-controllers/domain-controllers/HomepageBusinessPage';
describe('Test forms elements functionality', ()=>{
    let homepagePOM;
    beforeEach(()=>{
        cy.visit('/');
        homepagePOM = new Homepage();
    })

    it('Check form submission with static text', ()=>{
        homepagePOM.clickCategoryCard('Forms');
    })

})