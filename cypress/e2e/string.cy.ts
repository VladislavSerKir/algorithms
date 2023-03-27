import { baseUrl, changingColor, datacyStringButton, datacyStringInput, defaultColor, divClassCircleCircle, modifiedColor } from "../support/constants";

describe('Module string works correctly', function () {
    beforeEach(function () {
        cy.visit(`${baseUrl}/recursion`);
    });

    it('should disable button while empty input', () => {
        cy.get(datacyStringInput).should('have.value', '');
        cy.get(datacyStringButton).should('be.disabled')
    })

    it('should works correctly with input value: abcde', () => {
        cy.get(datacyStringInput).type('abcde');
        cy.get(datacyStringButton).click()
        cy.get(datacyStringButton).should('be.disabled')

        cy.clock()

        cy.get(divClassCircleCircle).then((circle) => {
            cy.wrap(circle)
                .eq(0)
                .should('have.css', 'border-color', changingColor)
                .contains('a')
            cy.wrap(circle)
                .eq(1)
                .should('have.css', 'border-color', defaultColor)
                .contains('b')
            cy.wrap(circle)
                .eq(2)
                .should('have.css', 'border-color', defaultColor)
                .contains('c')
            cy.wrap(circle)
                .eq(3)
                .should('have.css', 'border-color', defaultColor)
                .contains('d')
            cy.wrap(circle)
                .eq(4)
                .should('have.css', 'border-color', changingColor)
                .contains('e')

            cy.tick(1000)

            cy.wrap(circle)
                .eq(0)
                .should('have.css', 'border-color', modifiedColor)
                .contains('e')
            cy.wrap(circle)
                .eq(1)
                .should('have.css', 'border-color', changingColor)
                .contains('b')
            cy.wrap(circle)
                .eq(2)
                .should('have.css', 'border-color', defaultColor)
                .contains('c')
            cy.wrap(circle)
                .eq(3)
                .should('have.css', 'border-color', changingColor)
                .contains('d')
            cy.wrap(circle)
                .eq(4)
                .should('have.css', 'border-color', modifiedColor)
                .contains('a')

            cy.tick(1000)

            cy.wrap(circle)
                .eq(0)
                .should('have.css', 'border-color', modifiedColor)
                .contains('e')
            cy.wrap(circle)
                .eq(1)
                .should('have.css', 'border-color', modifiedColor)
                .contains('d')
            cy.wrap(circle)
                .eq(2)
                .should('have.css', 'border-color', changingColor)
                .contains('c')
            cy.wrap(circle)
                .eq(3)
                .should('have.css', 'border-color', modifiedColor)
                .contains('b')
            cy.wrap(circle)
                .eq(4)
                .should('have.css', 'border-color', modifiedColor)
                .contains('a')

            cy.tick(1000)

            cy.wrap(circle)
                .eq(0)
                .should('have.css', 'border-color', modifiedColor)
                .contains('e')
            cy.wrap(circle)
                .eq(1)
                .should('have.css', 'border-color', modifiedColor)
                .contains('d')
            cy.wrap(circle)
                .eq(2)
                .should('have.css', 'border-color', modifiedColor)
                .contains('c')
            cy.wrap(circle)
                .eq(3)
                .should('have.css', 'border-color', modifiedColor)
                .contains('b')
            cy.wrap(circle)
                .eq(4)
                .should('have.css', 'border-color', modifiedColor)
                .contains('a')
        })
    })
}); 