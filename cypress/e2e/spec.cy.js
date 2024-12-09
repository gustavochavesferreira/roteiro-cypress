describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  // Novos testes de integração a partir daqui:

  it('Não permite a inserção de uma tarefa sem texto', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('{enter}'); 
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Não adiciona nenhuma tarefa, filtra por tarefas completas e retorna uma lista vazia', () => {
    cy.visit(''); 
  
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
  
    cy.get('[data-cy=filter-completed-link]').click();
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });
  
  it('Alterna o status de tarefa entre completa e ativa', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Tarefa 1{enter}');
  
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]').click();
    cy.get('[data-cy=filter-completed-link]').click();
    cy.get('[data-cy=todos-list]').children().should('have.length', 1);
  
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]').click();
    cy.get('[data-cy=filter-active-link]').click();
    cy.get('[data-cy=todos-list]').children().should('have.length', 1);
  });
  
  
});