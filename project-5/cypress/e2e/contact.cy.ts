/// <reference types="Cypress" />

import { PRELOADER_DELAY } from '../../common/constants'

describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact')
    cy.wait(PRELOADER_DELAY + 100)

    cy.get('[data-cy="input-name"]').as('name')
    cy.get('[data-cy="input-email"]').as('email')
    cy.get('[data-cy="input-details"]').as('details')
    cy.get('[data-cy="form-submit"]').as('form-submit')
  })

  it('should display success alert on form submit', () => {
    cy.intercept('POST', '**/email/send', { statusCode: 200 })

    cy.get('@name').type('TestName')
    cy.get('@email').type('TestEmail@mail.com')
    cy.get('@details').type('TestDetails')

    cy.get('@form-submit').click()

    cy.get('[role="alert"]').should('be.visible')
    cy.get('[role="alert"]').contains(/email was send successfully/i)
  })

  it('should display error alert on form submit', () => {
    cy.intercept('POST', '**/email/send', { statusCode: 500 })

    cy.get('@name').type('TestName')
    cy.get('@email').type('TestEmail@mail.com')
    cy.get('@details').type('TestDetails')

    cy.get('@form-submit').click()

    cy.get('[role="alert"]').should('be.visible')
    cy.get('[role="alert"]').contains(/something went wrong/i)
  })
})
