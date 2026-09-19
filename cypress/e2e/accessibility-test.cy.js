import Homepage from '../../page-controllers/domain-controllers/HomepageBusinessPage';
import ModalDialogs from '../../page-controllers/domain-controllers/ModalDialogsBusinessPage';

describe('Test accessibility of key components', () => {
  let homepagePOM;
  let modalDialogsPOM;
  beforeEach(() => {
    cy.visit('/');
    homepagePOM = new Homepage();
    modalDialogsPOM = new ModalDialogs();
  });

  it('Check practice form has no new critical or serious accessibility violations', () => {
    homepagePOM.clickCategoryCard('Forms').clickMenuItem('Practice Form');
    // Known DemoQA defects (see DEFECTS.md): Date of Birth, Subjects, Picture and State inputs
    // are not linked to their labels, so screen readers cannot name them.
    cy.checkAccessibility('#userForm', { knownIssues: ['label', 'label-title-only'] });
  });

  it('Check small modal has no critical or serious accessibility violations', () => {
    homepagePOM.clickCategoryCard('Alerts, Frame & Windows').clickMenuItem('Modal Dialogs');
    modalDialogsPOM.openSmallModal();
    cy.checkAccessibility('.modal-content');
  });
});
