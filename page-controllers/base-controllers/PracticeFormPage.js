const exactText = (text) => new RegExp(`^${Cypress._.escapeRegExp(text)}$`);

class PracticeFormPage{

  fillFirstName(firstName){
    cy.get('#firstName').type(firstName);
    return this;
  }

  fillLastName(lastName){
    cy.get('#lastName').type(lastName);
    return this;
  }

  fillEmail(email){
    cy.get('#userEmail').type(email);
    return this;
  }

  selectGender(gender){
    cy.contains('label[for^="gender-radio"]', exactText(gender)).click();
    return this;
  }

  fillMobile(mobile){
    cy.get('#userNumber').type(mobile);
    return this;
  }

  // date = { day: 5, month: 'January', year: '1990' }
  selectDateOfBirth(date){
    // Day classes are zero-padded to 3 digits (--005, --015), and days from the
    // neighbouring months share the same class, so exclude those.
    const day = String(date.day).padStart(3, '0');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(date.month);
    // A number passed to select() is treated as an option index, so force a string.
    cy.get('.react-datepicker__year-select').select(String(date.year));
    cy.get(`.react-datepicker__day--${day}:not(.react-datepicker__day--outside-month)`).click();
    return this;
  }

  // Subjects, State and City are react-select dropdowns, not <select> elements:
  fillSubjects(subjects){
    subjects.forEach((subject) => {
      cy.get('#subjectsInput').type(subject);
      cy.contains('#subjectsContainer [role="option"]', exactText(subject)).click();
    });
    return this;
  }

  selectHobbies(hobbies){
    hobbies.forEach((hobby) => {
      cy.contains('label[for^="hobbies-checkbox"]', exactText(hobby)).click();
    });
    return this;
  }

  fillCurrentAddress(address){
    cy.get('#currentAddress').type(address);
    return this;
  }

  selectState(state){
    cy.get('#state input').type(state);
    cy.contains('#state [role="option"]', exactText(state)).click();
    return this;
  }

  // City stays disabled until a state has been selected.
  selectCity(city){
    cy.get('#city input').type(city);
    cy.contains('#city [role="option"]', exactText(city)).click();
    return this;
  }

  submitForm(){
    cy.get('#submit').click();
    return this;
  }

  checkResultsModalTitle(title){
    cy.get('#example-modal-sizes-title-lg').should('have.text', title);
    return this;
  }

  // The results modal is a Label | Values table; find the label cell, check the cell next to it.
  checkResultValue(label, value){
    cy.contains('.modal-body td', exactText(label)).next().should('have.text', value);
    return this;
  }
}

export default PracticeFormPage;
