import { changingColor, defaultColor, DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../support/constants";

describe('Module stack works correctly', function () {
    const addedElements = ['a', 'b', 'c', 'd', 'e']

    const createElements = () => {
        for (let i = 0; i < addedElements.length; i++) {
            cy.get('[data-cy="stack-input"]').type(addedElements[i]);
            cy.get('[data-cy="stack-button"]').click()
            cy.tick(SHORT_DELAY_IN_MS)
        }
    }

    beforeEach(function () {
        cy.visit('http://localhost:3000/stack');
    });

    it('should disable button while empty input', () => {
        cy.get('[data-cy="stack-input"]').should('have.value', '');
        cy.get('[data-cy="stack-button"]').should('be.disabled')
        cy.get('[data-cy="stack-clear"]').should('be.disabled')
        cy.get('[data-cy="stack-delete"]').should('be.disabled')
    })


    it('should add elements to stack', () => {
        cy.clock()

        for (let i = 0; i < addedElements.length; i++) {
            cy.get('[data-cy="stack-input"]').type(addedElements[i]);
            cy.get('[data-cy="stack-button"]').click()

            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .should('have.css', 'border-color', changingColor)
                    .contains(addedElements[i])

                cy.tick(SHORT_DELAY_IN_MS);

                cy.wrap(circle)
                    .eq(i)
                    .should('have.css', 'border-color', defaultColor)
                    .contains(addedElements[i])
            })
        }
    })


    it('should clear all elements from stack', () => {
        cy.clock()

        createElements()

        cy.get('div[class^=circle_circle]').then((circle) => {
            expect(circle).length.to.have.length(addedElements.length);
        });
        cy.get('div[class^=circle_circle]').should('have.length', addedElements.length);

        cy.get('div[class^=circle_circle]').its('length').then((size) => {
            cy.log(size.toString())
        });

        cy.get('[data-cy="stack-clear"]').click();
        cy.get('[data-cy="stack-clear"]').should('be.disabled')
        cy.get('[data-cy="stack-button"]').should('be.disabled')
        cy.get('[data-cy="stack-delete"]').should('be.disabled')
        cy.get('div[class^=circle_circle]').should('not.exist');
        cy.get('div[class^=circle_circle]').should('have.length', 0);
    })


    it('should remove element from stack', () => {
        cy.clock()

        createElements()

        cy.get('div[class^=circle_circle]').then((circle) => {
            expect(circle).length.to.have.length(addedElements.length);
        });

        cy.tick(DELAY_IN_MS)

        for (let k = 0; k < addedElements.length; k++) {
            cy.get('[data-cy="stack-delete"]').click();

            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(addedElements.length - k - 1)
                    .should('have.css', 'border-color', changingColor)
            })

            cy.tick(DELAY_IN_MS)

            if (k < addedElements.length - 1) {
                cy.get('div[class^=circle_circle]').then((circle) => {
                    expect(circle).length.to.have.length(addedElements.length - k - 1);
                });
            } else {
                cy.get('div[class^=circle_circle]').should('not.exist');
                cy.get('[data-cy="stack-delete"]').should('be.disabled');
            }
        }
    })
}); 