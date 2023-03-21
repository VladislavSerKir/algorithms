import { changingColor, defaultColor, DELAY_IN_MS } from "../support/constants";

describe('Module queue works correctly', function () {
    const addedElements = ['a', 'b', 'c', 'd', 'e']

    const createElements = () => {
        for (let i = 0; i < addedElements.length; i++) {
            cy.tick(DELAY_IN_MS)
            cy.get('[data-cy="queue-input"]').type(addedElements[i]);
            cy.get('[data-cy="queue-button"]').click()
            cy.tick(DELAY_IN_MS)
        }
    }

    beforeEach(function () {
        cy.visit('http://localhost:3000/queue');
    });

    it('should disable button while empty input', () => {
        cy.get('[data-cy="queue-input"]').should('have.value', '');
        cy.get('[data-cy="queue-button"]').should('be.disabled')
        cy.get('[data-cy="queue-clear"]').should('be.disabled')
        cy.get('[data-cy="queue-delete"]').should('be.disabled')
    })


    it('should add elements to queue', () => {
        cy.clock()

        for (let i = 0; i < addedElements.length; i++) {
            cy.get('[data-cy="queue-input"]').type(addedElements[i]);
            cy.get('[data-cy="queue-button"]').click()

            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .should('have.css', 'border-color', changingColor)
                    .contains(addedElements[i])

                cy.tick(DELAY_IN_MS);

                cy.wrap(circle)
                    .eq(i)
                    .should('have.css', 'border-color', defaultColor)
                    .contains(addedElements[i])
            })

            cy.tick(DELAY_IN_MS);

            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_head]')
                    .should('have.text', i === 0 ? 'head' : '');
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_tail]')
                    .contains('tail');
            });
        }
    })


    it('should clear all elements from queue', () => {
        cy.clock()

        createElements()

        cy.get('[data-cy="queue-clear"]').click();
        cy.tick(DELAY_IN_MS);

        for (let i = 0; i < addedElements.length; i++) {

            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .should('have.css', 'border-color', defaultColor)
                    .should('have.text', '')
            })

            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_head]')
                    .should('have.text', '');
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_tail]')
                    .should('have.text', '');
            });
        }

        cy.tick(DELAY_IN_MS);

        cy.get('[data-cy="queue-clear"]').should('be.disabled')
        cy.get('[data-cy="queue-button"]').should('be.disabled')
        cy.get('[data-cy="queue-delete"]').should('be.disabled')
    })


    it('should remove element from queue', () => {
        cy.clock()

        createElements()

        cy.get('div[class^=circle_circle]').then((circle) => {
            expect(circle).length.to.have.length(7);
        });

        cy.tick(DELAY_IN_MS)

        for (let k = 0; k < addedElements.length; k++) {
            cy.get('[data-cy="queue-delete"]').click();

            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .should('have.css', 'border-color', changingColor)
            })

            cy.tick(DELAY_IN_MS)

            cy.get('div[class^=circle_circle]').then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .should('have.css', 'border-color', defaultColor)
                    .should('have.text', '');
            })

            if (k < addedElements.length - 1) {
                cy.get('div[class^=circle_circle]').then((circle) => {
                    cy.wrap(circle)
                        .eq(k)
                        .find('[class*=circle_head]')
                        .should('not.exist');
                });
            } else {
                cy.get('[data-cy="queue-delete"]').should('be.disabled');
            }

            cy.tick(DELAY_IN_MS)
        }
    })
}); 