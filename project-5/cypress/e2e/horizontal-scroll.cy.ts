/// <reference types="Cypress" />

import { PRELOADER_DELAY } from '../../common/constants'

describe('horizontal scroll on about page', () => {
  beforeEach(() => {
    cy.visit('/about')
    cy.wait(PRELOADER_DELAY + 100)
  })

  it('on scrolling vertically it scrolls horizontally', () => {
    cy.get('[data-cy="scroll-wrapper"]').scrollTo('bottom')
    cy.get('[data-cy="about-experience"]').should('be.visible')
  })

  it('should scroll to the right', () => {
    cy.get('[data-cy="scroll-wrapper"]').scrollTo('right')
    cy.get('[data-cy="about-experience"]').should('be.visible')
  })
})
