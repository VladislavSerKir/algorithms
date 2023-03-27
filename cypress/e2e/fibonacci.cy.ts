import { baseUrl, datacyFibonacciButton, datacyFibonacciInput, DELAY_IN_MS, divClassCircleCircle } from "../support/constants";

describe('Module fibonacci works correctly', function () {

    beforeEach(function () {
        cy.visit(`${baseUrl}/fibonacci`);
    });

    it('should disable button while empty input', () => {
        cy.get(datacyFibonacciInput).should('have.value', '');
        cy.get(datacyFibonacciButton).should('be.disabled')
    })

    it('should generate correct fibonacci consequnce', () => {
        const correctOrder = [1, 1, 2, 3, 5]

        cy.get(datacyFibonacciInput).type('5');
        cy.get(datacyFibonacciButton).click()

        cy.clock()

        for (let i = 0; i < correctOrder.length; i++) {
            cy.get(divClassCircleCircle).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .contains(correctOrder[i])
            })

            cy.tick(DELAY_IN_MS);
        }
    })
}); 