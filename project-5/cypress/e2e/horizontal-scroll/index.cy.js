context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should scroll horizontally on About page", () => {
    cy.visit('http://localhost:3000/about/')
    // cy.get('.first').click()
    cy.scrollTo('right')
  });
});