const selectors = {
  showSmallModal: '#showSmallModal',
  modal: '.modal-content',
  smallModalTitle: '#example-modal-sizes-title-sm',
  modalBody: '.modal-body',
  closeSmallModal: '#closeSmallModal',
};

class ModalDialogsPage{

  clickSmallModalButton(){
    cy.get(selectors.showSmallModal).click();
    return this;
  }

  checkSmallModalTitle(title){
    cy.get(selectors.smallModalTitle).should('be.visible').and('have.text', title);
    return this;
  }

  checkModalBody(text){
    cy.get(selectors.modalBody).should('have.text', text);
    return this;
  }

  clickCloseSmallModal(){
    cy.get(selectors.closeSmallModal).click();
    return this;
  }

  checkModalIsClosed(){
    cy.get(selectors.modal).should('not.exist');
    return this;
  }
}

export default ModalDialogsPage;
