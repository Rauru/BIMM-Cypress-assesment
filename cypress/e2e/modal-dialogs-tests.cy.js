import Homepage from '../../page-controllers/domain-controllers/HomepageBusinessPage';
import ModalDialogs from '../../page-controllers/domain-controllers/ModalDialogsBusinessPage';
describe('Test modal dialogs functionality', ()=>{
    let homepagePOM;
    let modalDialogsPOM;
    beforeEach(()=>{
        cy.visit('/');
        homepagePOM = new Homepage();
        modalDialogsPOM = new ModalDialogs();
    })

    it('Check small modal opens with its content and closes', ()=>{
        homepagePOM.clickCategoryCard('Alerts, Frame & Windows')
                   .clickMenuItem('Modal Dialogs');
        cy.location('pathname').should('eq', '/modal-dialogs');
        modalDialogsPOM.openSmallModal()
                       .checkSmallModalContent()
                       .closeSmallModal();
    })

    it('Check large modal opens with its content and closes', ()=>{
        cy.visit('/modal-dialogs');
        modalDialogsPOM.openLargeModal()
                       .checkLargeModalContent()
                       .closeLargeModal();
    })

    it('Check small modal closes with the X icon', ()=>{
        cy.visit('/modal-dialogs');
        modalDialogsPOM.openSmallModal()
                       .checkSmallModalContent()
                       .closeModalWithIcon();
    })

    it('Check large modal closes with the X icon', ()=>{
        cy.visit('/modal-dialogs');
        modalDialogsPOM.openLargeModal()
                       .checkLargeModalContent()
                       .closeModalWithIcon();
    })

})
