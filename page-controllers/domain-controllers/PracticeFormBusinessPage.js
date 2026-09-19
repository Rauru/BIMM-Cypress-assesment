import PracticeFormPage from '../base-controllers/PracticeFormPage';

class PracticeFormBusinessPage {
  constructor() {
    this.practiceFormPage = new PracticeFormPage();
  }

  fillStudentForm(user) {
    this.practiceFormPage
      .fillFirstName(user.firstName)
      .fillLastName(user.lastName)
      .fillEmail(user.email)
      .selectGender(user.gender)
      .fillMobile(user.mobile)
      .selectDateOfBirth(user.dateOfBirth)
      .fillSubjects(user.subjects)
      .selectHobbies(user.hobbies)
      .fillCurrentAddress(user.currentAddress)
      .selectState(user.state)
      .selectCity(user.city);
    return this;
  }

  submitForm() {
    this.practiceFormPage.submitForm();
    return this;
  }

  // The modal formats some values differently from how they are entered,
  // e.g. the date shows as "15 January,1990" and state/city as "NCR Delhi".
  checkSubmittedData(user) {
    const { day, month, year } = user.dateOfBirth;
    this.practiceFormPage
      .checkResultsModalTitle('Thanks for submitting the form')
      .checkResultValue('Student Name', `${user.firstName} ${user.lastName}`)
      .checkResultValue('Student Email', user.email)
      .checkResultValue('Gender', user.gender)
      .checkResultValue('Mobile', user.mobile)
      .checkResultValue('Date of Birth', `${String(day).padStart(2, '0')} ${month},${year}`)
      .checkResultValue('Subjects', user.subjects.join(', '))
      .checkResultValue('Hobbies', user.hobbies.join(', '))
      .checkResultValue('Address', user.currentAddress)
      .checkResultValue('State and City', `${user.state} ${user.city}`);
    return this;
  }

  checkRequiredFieldErrors() {
    this.practiceFormPage
      .checkFormWasValidated()
      .checkFieldIsInvalid('firstName')
      .checkFieldIsInvalid('lastName')
      .checkFieldIsInvalid('gender')
      .checkFieldIsInvalid('mobile')
      .checkResultsModalIsNotDisplayed();
    return this;
  }

  // One invalid field should block the submission and be the field marked red.
  checkFieldError(field) {
    this.practiceFormPage
      .checkFormWasValidated()
      .checkFieldIsInvalid(field)
      .checkResultsModalIsNotDisplayed();
    return this;
  }

  checkCityIsEnabledOnlyAfterSelectingState(state) {
    this.practiceFormPage.checkCityIsDisabled().selectState(state).checkCityIsEnabled();
    return this;
  }
}

export default PracticeFormBusinessPage;
