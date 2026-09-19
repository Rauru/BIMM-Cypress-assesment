import Homepage from '../../page-controllers/domain-controllers/HomepageBusinessPage';
import Elements from '../../page-controllers/domain-controllers/ElementsBusinessPage';
describe('Test elements functionality', () => {
  let homepagePOM;
  let elementsPOM;
  beforeEach(() => {
    cy.visit('/');
    homepagePOM = new Homepage();
    elementsPOM = new Elements();
  });

  it('Check yes radio button can be selected', () => {
    homepagePOM.clickCategoryCard('Elements').clickMenuItem('Radio Button');
    cy.location('pathname').should('eq', '/radio-button');
    elementsPOM.selectRadioButton('Yes');
  });

  it('Check impressive radio button can be selected', () => {
    homepagePOM.clickCategoryCard('Elements').clickMenuItem('Radio Button');
    elementsPOM.selectRadioButton('Impressive');
  });

  it('Check no radio button is disabled', () => {
    homepagePOM.clickCategoryCard('Elements').clickMenuItem('Radio Button');
    elementsPOM.checkNoRadioButtonIsDisabled();
  });
});
