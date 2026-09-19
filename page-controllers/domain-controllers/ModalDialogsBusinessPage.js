import ModalDialogsPage from '../base-controllers/ModalDialogsPage';

class ModalDialogsBusinessPage{
  constructor(){
    this.modalDialogsPage = new ModalDialogsPage();
  }

  openSmallModal(){
    this.modalDialogsPage.clickSmallModalButton();
    return this;
  }

  checkSmallModalContent(){
    this.modalDialogsPage
      .checkSmallModalTitle('Small Modal')
      .checkModalBody('This is a small modal. It has very less content');
    return this;
  }

  closeSmallModal(){
    this.modalDialogsPage
      .clickCloseSmallModal()
      .checkModalIsClosed();
    return this;
  }
}

export default ModalDialogsBusinessPage;
