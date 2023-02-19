describe('header version-1', () => {
  it('header should get background color once page moved from page to another page', () => {
    // * arrange
    cy.visit('/')
    cy.wait(3200) // * preloader

    // * act
    cy.get('[role="left-side-header"]').should(
      'not.have.css',
      'background-color',
      'rgb(53, 53, 53)'
    )
    cy.get('[role="right-side-header"]').should(
      'not.have.css',
      'background-color',
      'rgb(53, 53, 53)'
    )
    cy.visit('/projects')

    // * assert
    cy.get('[role="left-side-header"]').should(
      'have.css',
      'background-color',
      'rgb(53, 53, 53)'
    )
    cy.get('[role="right-side-header"]').should(
      'have.css',
      'background-color',
      'rgb(53, 53, 53)'
    )
  })

  it(`header's content gets hidden when header is rendered on non-home page`, () => {
    // * arrange
    cy.visit('/')
    cy.wait(3200) // * preloader

    // * assert
    cy.get('[data-test-id="language-toggler-wrapper"]').should('be.visible')
    cy.get('[data-test-id="theme-toggler-wrapper"]').should('be.visible')
    cy.get('[data-test-id="ul-nav-list"]').should('be.visible')

    // * act
    cy.visit('/projects')

    // * assert
    cy.get('[data-test-id="language-toggler-wrapper"]').should('not.be.visible')
    cy.get('[data-test-id="theme-toggler-wrapper"]').should('not.be.visible')
    cy.get('[data-test-id="ul-nav-list"]').should('not.be.visible')
  })

  it(`header nav list menu items and theme-language toggler shows up when hovered`, () => {
    // * arrange
    cy.visit('/projects')
    cy.wait(3200) // * preloader

    // * act
    // * assert
    cy.get('[data-test-id="language-toggler-wrapper"]').should('not.be.visible')
    cy.get('[data-test-id="theme-toggler-wrapper"]').should('not.be.visible')

    cy.get('[role="left-side-header"]').click({ force: true })

    cy.get('[data-test-id="language-toggler-wrapper"]').should('be.visible')
    cy.get('[data-test-id="theme-toggler-wrapper"]').should('be.visible')

    // * act
    // * assert
    cy.get('[data-test-id="ul-nav-list"]').should('not.be.visible')
    cy.get('[role="right-side-header"]').click({ force: true })
    cy.get('[data-test-id="ul-nav-list"]').should('be.visible')
  })
})
