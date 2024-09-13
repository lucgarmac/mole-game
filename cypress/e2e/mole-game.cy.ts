describe('Mole game specs', () => {

  it('Insert username, navigate to game and play game. Obtains points and stop game', () => {
    cy.visit('http://localhost:4200/home');

    cy.url().should('include', 'home');

    cy.get('[data-cy="input-username"]').clear().type('Test');
    cy.get('[data-cy="access-game-btn"]').find('button').should('be.enabled');
    cy.get('[data-cy="access-game-btn"]').click();

    cy.url().should('include', 'game');

    cy.get('[data-cy="notification"]').should('not.exist');
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="mole-img"]').first().parent().click();
    cy.get('[data-cy="points"]').should('contain.text', '10');
    cy.get('[data-cy="notification"]').should('exist');
    cy.get('[data-cy="notification"]').should('contain.text', 'Good job!');
    cy.get('[data-cy="stop-btn"]').click();
    cy.get('[data-cy="mole-img"]').should('not.exist');
    cy.get('[data-cy="points"]').should('contain.text', '0');
  });

  it('Insert username, navigate to game and play game. Change dificulty and total moles to show. Obtains points and stop game', () => {
    cy.visit('http://localhost:4200/home');

    cy.url().should('include', 'home');

    cy.get('[data-cy="input-username"]').clear().type('Test');
    cy.get('[data-cy="access-game-btn"]').find('button').should('be.enabled');
    cy.get('[data-cy="access-game-btn"]').click();

    cy.url().should('include', 'game');

    cy.get('[data-cy="notification"]').should('not.exist');
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="mole-img"]').first().parent().click();
    cy.get('[data-cy="points"]').should('contain.text', '10');
    cy.get('[data-cy="notification"]').should('exist');
    cy.get('[data-cy="notification"]').should('contain.text', 'Good job!');

    cy.get('[data-cy="level-select"]').select('high').invoke('val').should('eq', 'high');
    cy.get('[data-cy="num-moles-select"]').select('2').invoke('val').should('eq', '2');

    cy.get('[data-cy="mole-img"]').should('have.length', 2);
    cy.get('[data-cy="mole-img"]').first().parent().click();
    cy.get('[data-cy="points"]').should('contain.text', '40');
    cy.get('[data-cy="notification"]').should('exist');
    cy.get('[data-cy="notification"]').should('contain.text', 'Good job!');

    cy.get('[data-cy="stop-btn"]').click();
    cy.get('[data-cy="mole-img"]').should('not.exist');
    cy.get('[data-cy="points"]').should('contain.text', '0');
  });
});
