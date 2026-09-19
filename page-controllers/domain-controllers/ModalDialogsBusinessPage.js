import ModalDialogsPage from '../base-controllers/ModalDialogsPage';

const LARGE_MODAL_TEXT =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer " +
  'took a galley of type and scrambled it to make a type specimen book. It has survived not only five ' +
  'centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was ' +
  'popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
  'recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

class ModalDialogsBusinessPage {
  constructor() {
    this.modalDialogsPage = new ModalDialogsPage();
  }

  // Confirming the modal opened first means the "is closed" check afterwards can't pass
  // just because the modal never appeared.
  openSmallModal() {
    this.modalDialogsPage.clickSmallModalButton().checkModalIsOpen();
    return this;
  }

  checkSmallModalContent() {
    this.modalDialogsPage
      .checkSmallModalTitle('Small Modal')
      .checkModalBody('This is a small modal. It has very less content');
    return this;
  }

  closeSmallModal() {
    this.modalDialogsPage.clickCloseSmallModal().checkModalIsClosed();
    return this;
  }

  openLargeModal() {
    this.modalDialogsPage.clickLargeModalButton().checkModalIsOpen();
    return this;
  }

  checkLargeModalContent() {
    this.modalDialogsPage
      .checkLargeModalIsDisplayed()
      .checkLargeModalTitle('Large Modal')
      .checkModalBody(LARGE_MODAL_TEXT);
    return this;
  }

  closeLargeModal() {
    this.modalDialogsPage.clickCloseLargeModal().checkModalIsClosed();
    return this;
  }

  // Works for either modal, since both share the same X icon.
  closeModalWithIcon() {
    this.modalDialogsPage.clickCloseIcon().checkModalIsClosed();
    return this;
  }
}

export default ModalDialogsBusinessPage;
