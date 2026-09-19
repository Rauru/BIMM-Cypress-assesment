import ElementsPage from '../base-controllers/ElementsPage';

class ElementsBusinessPage{
  constructor(){
    this.elementsPage = new ElementsPage();
  }

  selectRadioButton(name){
    this.elementsPage
      .clickRadioButton(name)
      .checkRadioButtonIsChecked(name)
      .checkSelectedResult(name);
    return this;
  }

  // "No" can't be selected: it is disabled, unchecked and no result text is shown.
  checkNoRadioButtonIsDisabled(){
    this.elementsPage
      .checkRadioButtonIsDisabled('No')
      .checkRadioButtonIsNotChecked('No')
      .checkNoResultIsDisplayed();
    return this;
  }
}

export default ElementsBusinessPage;
