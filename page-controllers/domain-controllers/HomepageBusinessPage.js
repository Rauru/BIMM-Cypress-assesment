import DemoqaPage from '../base-controllers/DemoqaNavigation';

class HomepageBusinessPage{
  constructor(){
    this.demoqaPage = new DemoqaPage();
  }

  clickCategoryCard(card){
    this.demoqaPage.checkCardIsVisible(card);
    this.demoqaPage.clickCategoryCard(card);
    return this;
  }

  clickDropdown(name){
    this.demoqaPage.checkDropdownIsVisible(name);
    this.demoqaPage.clickDropdown(name);
    return this; 
  }
}

export default HomepageBusinessPage;