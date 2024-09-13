describe('template spec', () => {

  it('Show input error when not insert a username', () => {
    cy.visit('http://localhost:4200/home');

    cy.url().should('include', 'home');

    cy.get('[data-cy="input-username"]').clear().type('Test');
    cy.get('[data-cy="access-game-btn"]').find('button').should('be.enabled');
    cy.get('[data-cy="input-username"]').clear();
    cy.get('[data-cy="access-game-btn"]').find('button').should('be.disabled');

  });

  it('Show navigate to game when insert a username', () => {
    cy.visit('http://localhost:4200/home');

    cy.url().should('include', 'home');

    cy.get('[data-cy="input-username"]').clear().type('Test');
    cy.get('[data-cy="access-game-btn"]').find('button').should('be.enabled');
    cy.get('[data-cy="access-game-btn"]').click();

    cy.url().should('include', 'game');
  });
})
