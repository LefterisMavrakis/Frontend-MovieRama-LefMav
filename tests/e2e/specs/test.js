// https://docs.cypress.io/api/table-of-contents

describe('My First Test', () => {
  it('Visits the app root url it renders Welcome', () => {
    cy.visit('/')
    cy.contains('h2', 'Welcome.')
  })
})
describe('Show More Button', () => {
  it('Visits the app root url and clicks show More button should open movie expansion', () => {
    cy.visit('/')
    cy.get('.movieItemDetailsWrapper').first().should('not.have.class', 'visible')
    cy.get('.showMoreBtn').first().click()
    cy.get('.movieItemDetailsWrapper').should('have.class', 'visible')
  })
})