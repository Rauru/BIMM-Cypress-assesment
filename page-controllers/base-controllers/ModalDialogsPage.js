const selectors = {
  showSmallModal: '#showSmallModal',
  modal: '.modal-content',
  // The outer Bootstrap wrapper; it fades in by animating its opacity.
  modalWrapper: '.modal',
  smallModalTitle: '#example-modal-sizes-title-sm',
  modalBody: '.modal-body',
  closeSmallModal: '#closeSmallModal',
  showLargeModal: '#showLargeModal',
  largeModalDialog: '.modal-dialog.modal-lg',
  largeModalTitle: '#example-modal-sizes-title-lg',
  closeLargeModal: '#closeLargeModal',
  // The X icon in the header; both modals share it and only one modal is open at a time.
  closeIcon: '.modal-header .btn-close',
};

class ModalDialogsPage {
  clickSmallModalButton() {
    cy.get(selectors.showSmallModal).click();
    return this;
  }

  checkSmallModalTitle(title) {
    cy.get(selectors.smallModalTitle).should('be.visible').and('have.text', title);
    return this;
  }

  checkModalBody(text) {
    cy.get(selectors.modalBody).should('have.text', text);
    return this;
  }

  clickCloseSmallModal() {
    cy.get(selectors.closeSmallModal).click();
    return this;
  }

  clickLargeModalButton() {
    cy.get(selectors.showLargeModal).click();
    return this;
  }

  // The large modal is the one rendered with Bootstrap's "modal-lg" size class.
  checkLargeModalIsDisplayed() {
    cy.get(selectors.largeModalDialog).should('be.visible');
    return this;
  }

  checkLargeModalTitle(title) {
    cy.get(selectors.largeModalTitle).should('be.visible').and('have.text', title);
    return this;
  }

  clickCloseLargeModal() {
    cy.get(selectors.closeLargeModal).click();
    return this;
  }

  clickCloseIcon() {
    cy.get(selectors.closeIcon).click();
    return this;
  }

  // Waits for the fade-in to finish: mid-animation the modal is semi-transparent, which made
  // accessibility scans intermittently report low colour contrast.
  checkModalIsOpen() {
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modalWrapper).should('have.css', 'opacity', '1');
    return this;
  }

  // Bootstrap removes the modal from the page once its closing animation ends;
  // Cypress retries this until it is gone or the timeout is reached.
  checkModalIsClosed() {
    cy.get(selectors.modal).should('not.exist');
    return this;
  }
}

export default ModalDialogsPage;
