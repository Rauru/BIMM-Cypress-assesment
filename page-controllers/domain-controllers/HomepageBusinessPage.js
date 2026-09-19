import DemoqaPage from '../base-controllers/DemoqaNavigation';

class HomepageBusinessPage {
  constructor() {
    this.demoqaPage = new DemoqaPage();
  }

  clickCategoryCard(card) {
    this.demoqaPage.checkCardIsVisible(card);
    this.demoqaPage.clickCategoryCard(card);
    return this;
  }

  clickMenuItem(name) {
    this.demoqaPage.checkMenuItemIsVisible(name);
    this.demoqaPage.clickMenuItem(name);
    return this;
  }
}

export default HomepageBusinessPage;
