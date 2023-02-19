describe('header version-1', () => {
  it('header should get background color once page moved from page to another page', () => {
    // * arrange
    cy.visit('/')
    cy.wait(3200)

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
})
