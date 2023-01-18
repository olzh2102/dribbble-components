describe('horizontal scroll on about page', () => {
  it('on scrolling vertically, it scrolls horizontally', () => {
    // * arrange
    cy.visit('/')
    cy.wait(3200)
    cy.get(':nth-child(3) > a').click()
    cy.get('[data-test-id="hs-item"]').first().click()

    // * act & assert
    cy.get('[data-test-id="horizontal-scroll"]').scrollTo('bottom')
  })
})
