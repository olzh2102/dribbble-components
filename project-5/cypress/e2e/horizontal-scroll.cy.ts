describe('horizontal scroll on about page', () => {
  it('on scrolling vertically, it scrolls horizontally', () => {
    // * arrange
    cy.visit('/about')
    cy.wait(3200)
    cy.get('[data-test-id="hs-item"]').first().click()

    // * act & assert
    cy.get('[data-test-id="scroll-wrapper"]').scrollTo('bottom')
  })
})
