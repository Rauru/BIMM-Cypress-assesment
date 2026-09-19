import Homepage from '../../page-controllers/domain-controllers/HomepageBusinessPage';
import PracticeForm from '../../page-controllers/domain-controllers/PracticeFormBusinessPage';
describe('Test forms elements functionality', ()=>{
    let homepagePOM;
    let practiceFormPOM;
    let userData;
    beforeEach(()=>{
        cy.visit('/');
        homepagePOM = new Homepage();
        practiceFormPOM = new PracticeForm();
        cy.fixture('userData').then((data)=>{
            userData = data;
        });
    })

    it('Check form submission with static text', ()=>{
        homepagePOM.clickCategoryCard('Forms')
                   .clickMenuItem('Practice Form');
        cy.location('pathname').should('eq', '/automation-practice-form');
        practiceFormPOM.fillStudentForm(userData)
                       .submitForm()
                       .checkSubmittedData(userData);
    })

})
