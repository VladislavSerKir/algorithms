import { DELAY_IN_MS } from "../support/constants";

describe('Module fibonacci works correctly', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('should disable button while empty input', () => {
        cy.get('[data-cy="fibonacci-input"]').should('have.value', '');
        cy.get('[data-cy="fibonacci-button"]').should('be.disabled')
    })

    it('should generate correct fibonacci consequnce', () => {
        const correctOrder = [1, 1, 2, 3, 5]

        cy.get('[data-cy="fibonacci-input"]').type('5');
        cy.get('[data-cy="fibonacci-button"]').click()

        cy.clock()

        for (let i = 0; i < correctOrder.length; i++) {
            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .contains(correctOrder[i])
            })

            cy.tick(DELAY_IN_MS);
        }
    })
}); 