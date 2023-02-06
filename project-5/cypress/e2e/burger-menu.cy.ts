describe('burger menu', () => {
  beforeEach(() => {
    cy.visit('/services')
    cy.wait(3200)
  })

  it.skip('Header should be hidden by default', () => {
    cy.get('[data-test-id="header"]').should('have.css', 'clip-path', 'circle(1px at 1440px 0%)')
  })

  it.skip('should open Header on burger-menu click', () => {
    cy.get('[data-test-id="burger-menu"]').click()

    cy.get('[data-test-id="header"]').should('have.css', 'clip-path', 'circle(5000px at 1440px 0%)')
  })

  it.skip('should close burger-menu when route changes', () => {
    cy.get('[data-test-id="burger-menu"]').click()

    // * projects page link
    cy.get(':nth-child(2) > a').click()

    cy.get('[data-test-id="header"]').should('have.css', 'clip-path', 'circle(1px at 1440px 0%)')
  })

  it.skip('should not close burger-menu on theme/lang toggle', () => {
    cy.get('[data-test-id="burger-menu"]').click()
    cy.get('[role="moon-btn"]').click()

    cy.get('[data-test-id="header"]').should('have.css', 'clip-path', 'circle(5000px at 1440px 0%)')
  })
})
