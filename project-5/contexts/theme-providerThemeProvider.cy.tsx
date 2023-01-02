import React from 'react'
import ThemeProvider from './theme-provider'

describe('<ThemeProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ThemeProvider />)
  })
})