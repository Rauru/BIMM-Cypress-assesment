import { exactText } from '../../cypress/support/helpers';

const selectors = {
  radioLabel: '.form-check-label',
  radioInput: {
    Yes: '#yesRadio',
    Impressive: '#impressiveRadio',
    No: '#noRadio',
  },
  resultText: 'p',
};

class ElementsPage {
  // The radio inputs are covered by their labels, so click the label like a user would.
  clickRadioButton(name) {
    cy.contains(selectors.radioLabel, exactText(name)).click();
    return this;
  }

  checkRadioButtonIsChecked(name) {
    cy.get(selectors.radioInput[name]).should('be.checked');
    return this;
  }

  checkRadioButtonIsNotChecked(name) {
    cy.get(selectors.radioInput[name]).should('not.be.checked');
    return this;
  }

  checkRadioButtonIsDisabled(name) {
    cy.get(selectors.radioInput[name]).should('be.disabled');
    return this;
  }

  // e.g. "You have selected Yes"
  checkSelectedResult(name) {
    cy.contains(selectors.resultText, 'You have selected').should(
      'have.text',
      `You have selected ${name}`,
    );
    return this;
  }

  checkNoResultIsDisplayed() {
    cy.contains(selectors.resultText, 'You have selected').should('not.exist');
    return this;
  }
}

export default ElementsPage;
