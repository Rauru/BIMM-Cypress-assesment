import Homepage from '../../page-controllers/domain-controllers/HomepageBusinessPage';
import PracticeForm from '../../page-controllers/domain-controllers/PracticeFormBusinessPage';
import { generateRandomStudent } from '../support/generateRandomFixture';
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

    it('Check form submission with randomized data', ()=>{
        const randomStudent = generateRandomStudent();
        // Log the generated data so a failure can be reproduced with the same values.
        cy.log(JSON.stringify(randomStudent));
        cy.visit('/automation-practice-form');
        practiceFormPOM.fillStudentForm(randomStudent)
                       .submitForm()
                       .checkSubmittedData(randomStudent);
    })

    it('Check empty form submission shows required field errors', ()=>{
        cy.visit('/automation-practice-form');
        practiceFormPOM.submitForm()
                       .checkRequiredFieldErrors();
    })

    it('Check form submission with an invalid email is rejected', ()=>{
        cy.visit('/automation-practice-form');
        practiceFormPOM.fillStudentForm({ ...userData, email: userData.wrongEmail })
                       .submitForm()
                       .checkFieldError('email');
    })

    it('Check form submission with a 9 digit mobile number is rejected', ()=>{
        cy.visit('/automation-practice-form');
        practiceFormPOM.fillStudentForm({ ...userData, mobile: userData.shortMobile })
                       .submitForm()
                       .checkFieldError('mobile');
    })

    it('Check city is disabled until a state is selected', ()=>{
        cy.visit('/automation-practice-form');
        practiceFormPOM.checkCityIsEnabledOnlyAfterSelectingState(userData.state);
    })

})
