/// <reference types="Cypress" />

import { PRELOADER_DELAY } from '../../common/constants'

describe('desktop header', { defaultCommandTimeout: PRELOADER_DELAY + 100 }, () => {
  beforeEach(() => {
    cy.visit('/')

    cy.get('[data-cy="language-toggler-container"]').as('languageTogglerContainer')
    cy.get('[data-cy="theme-toggler-container"]').as('themeTogglerContainer')
    cy.get('[data-cy="language-and-theme-toggler-container"]').as(
      'languageAndThemeTogglerContainer'
    )
    cy.get('[data-cy="navigation-menu"]').as('navMenu')
    cy.get('[data-cy="navigation-menu-list"]').as('navMenuList')
    cy.get('[data-cy="cursor"]').as('cursor')
  })

  it("header's content gets hidden when header is rendered on non-home page", () => {
    cy.get('@languageTogglerContainer').should('be.visible')
    cy.get('@themeTogglerContainer').should('be.visible')
    cy.get('@navMenuList').should('be.visible')

    cy.get('@navMenuList')
      .contains(/projects/i)
      .click()

    cy.get('@cursor').click(30, 50, { force: true })

    cy.get('@languageTogglerContainer').should('not.be.visible')
    cy.get('@themeTogglerContainer').should('not.be.visible')
    cy.get('@navMenuList').should('not.be.visible')
  })

  it('header nav list menu items and theme-language toggler shows up when clicked', () => {
    cy.get('@navMenuList')
      .contains(/projects/i)
      .click()

    cy.get('@cursor').click(30, 50, { force: true })

    cy.get('@languageTogglerContainer').should('not.be.visible')
    cy.get('@themeTogglerContainer').should('not.be.visible')

    cy.get('@languageAndThemeTogglerContainer').click({ force: true })

    cy.get('@languageTogglerContainer').should('be.visible')
    cy.get('@themeTogglerContainer').should('be.visible')

    cy.get('@navMenuList').should('not.be.visible')
    cy.get('@navMenu').click({ force: true })
    cy.get('@navMenuList').should('be.visible')
  })
})
