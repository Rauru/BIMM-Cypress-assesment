import { exactText } from '../../cypress/support/helpers';

const INVALID_RED = 'rgb(220, 53, 69)';

const selectors = {
  form: '#userForm',
  firstName: '#firstName',
  lastName: '#lastName',
  email: '#userEmail',
  gender: 'input[name="gender"]',
  genderLabel: 'label[for^="gender-radio"]',
  mobile: '#userNumber',
  dateOfBirthInput: '#dateOfBirthInput',
  datePickerMonth: '.react-datepicker__month-select',
  datePickerYear: '.react-datepicker__year-select',
  // Day classes are zero-padded to 3 digits (--005, --015), and days from the
  // neighbouring months share the same class, so exclude those.
  datePickerDay: (day) => `.react-datepicker__day--${String(day).padStart(3, '0')}:not(.react-datepicker__day--outside-month)`,
  subjectsInput: '#subjectsInput',
  subjectsOption: '#subjectsContainer [role="option"]',
  hobbyLabel: 'label[for^="hobbies-checkbox"]',
  currentAddress: '#currentAddress',
  stateInput: '#state input',
  stateOption: '#state [role="option"]',
  cityInput: '#city input',
  cityOption: '#city [role="option"]',
  submit: '#submit',
  resultsModal: '.modal-content',
  resultsModalTitle: '#example-modal-sizes-title-lg',
  resultsCell: '.modal-body td',
};

class PracticeFormPage{

  fillFirstName(firstName){
    cy.get(selectors.firstName).type(firstName);
    return this;
  }

  fillLastName(lastName){
    cy.get(selectors.lastName).type(lastName);
    return this;
  }

  fillEmail(email){
    cy.get(selectors.email).type(email);
    return this;
  }

  selectGender(gender){
    cy.contains(selectors.genderLabel, exactText(gender)).click();
    return this;
  }

  // Uses real keyboard input so the browser enforces the 10-digit minlength (see typeAsUser).
  fillMobile(mobile){
    cy.get(selectors.mobile).typeAsUser(mobile);
    return this;
  }

  // date = { day: 5, month: 'January', year: '1990' }
  selectDateOfBirth(date){
    cy.get(selectors.dateOfBirthInput).click();
    cy.get(selectors.datePickerMonth).select(date.month);
    // A number passed to select() is treated as an option index, so force a string.
    cy.get(selectors.datePickerYear).select(String(date.year));
    cy.get(selectors.datePickerDay(date.day)).click();
    return this;
  }

  // Subjects, State and City are react-select dropdowns, not <select> elements:
  fillSubjects(subjects){
    subjects.forEach((subject) => {
      cy.get(selectors.subjectsInput).type(subject);
      cy.contains(selectors.subjectsOption, exactText(subject)).click();
    });
    return this;
  }

  selectHobbies(hobbies){
    hobbies.forEach((hobby) => {
      cy.contains(selectors.hobbyLabel, exactText(hobby)).click();
    });
    return this;
  }

  fillCurrentAddress(address){
    cy.get(selectors.currentAddress).type(address);
    return this;
  }

  selectState(state){
    cy.get(selectors.stateInput).type(state);
    cy.contains(selectors.stateOption, exactText(state)).click();
    return this;
  }

  // City stays disabled until a state has been selected.
  selectCity(city){
    cy.get(selectors.cityInput).type(city);
    cy.contains(selectors.cityOption, exactText(city)).click();
    return this;
  }

  submitForm(){
    cy.get(selectors.submit).click();
    return this;
  }

  checkResultsModalTitle(title){
    cy.get(selectors.resultsModalTitle).should('have.text', title);
    return this;
  }

  // The results modal is a Label | Values table; find the label cell, check the cell next to it.
  checkResultValue(label, value){
    cy.contains(selectors.resultsCell, exactText(label)).next().should('have.text', value);
    return this;
  }

  checkResultsModalIsNotDisplayed(){
    cy.get(selectors.resultsModal).should('not.exist');
    return this;
  }

  // After a submit attempt the form gets the Bootstrap "was-validated" class,
  // which colours every :invalid field red.
  checkFormWasValidated(){
    cy.get(selectors.form).should('have.class', 'was-validated');
    return this;
  }

  checkCityIsDisabled(){
    cy.get(selectors.cityInput).should('be.disabled');
    return this;
  }

  checkCityIsEnabled(){
    cy.get(selectors.cityInput).should('be.enabled');
    return this;
  }

  // field is a key of selectors, e.g. 'firstName' or 'gender' (checks all 3 radios).
  checkFieldIsInvalid(field){
    cy.get(selectors[field]).each(($el) => {
      cy.wrap($el).should('match', ':invalid')
        .and('have.css', 'border-color', INVALID_RED);
    });
    return this;
  }
}

export default PracticeFormPage;
