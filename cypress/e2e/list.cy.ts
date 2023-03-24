import { changingColor, defaultColor, DELAY_IN_MS, modifiedColor, SHORT_DELAY_IN_MS } from "../support/constants";

describe('Module list works correctly', function () {
    const initialElements = [0, 34, 8, 1];

    beforeEach(function () {
        cy.visit('http://localhost:3000/list');
    });

    it('should disable button while empty input', () => {
        cy.get('[data-cy="list-input-value"]').should('have.value', '');
        cy.get('[data-cy="list-add-to-head"]').should('be.disabled')
        cy.get('[data-cy="list-add-to-tail"]').should('be.disabled')
        cy.get('[data-cy="list-add-by-index"]').should('be.disabled')
        cy.get('[data-cy="list-remove-by-index"]').should('be.disabled')
    })


    it(`should form initial consequence of elements [${initialElements}]`, () => {
        cy.clock()

        for (let i = 0; i < initialElements.length; i++) {
            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_letter]')
                    .should('have.text', initialElements[i])

                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_head]')
                    .should('have.text', i === 0 ? 'head' : '');

                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_tail]')
                    .should('have.text', i === initialElements.length - 1 ? 'tail' : '');
            })
        }
    })


    it('should add element 8 to head', () => {
        cy.clock()

        let value = '8'

        cy.get('[data-cy="list-input-value"]').type(value);
        cy.get('[data-cy="list-add-to-head"]').click()

        cy.get('div[class*=circle_small]').should('exist');
        cy.get('div[class*=circle_small]')
            .should('have.text', value)
            .should('have.css', 'border-color', changingColor)

        cy.tick(DELAY_IN_MS);

        cy.get('div[class^=circle_content]').then((circle) => {
            cy.wrap(circle)
                .eq(0)
                .find('[class*=circle_letter]')
                .should('have.text', value)
            cy.wrap(circle)
                .eq(0)
                .find('[class*=circle_head]')
                .should('have.text', 'head')
            cy.wrap(circle)
                .eq(0)
                .find('[class*=circle_circle]')
                .should('have.css', 'border-color', modifiedColor)
        })

        cy.tick(DELAY_IN_MS);

        cy.get('div[class^=circle_content]').should('have.length', initialElements.length + 1);

        for (let i = 0; i < initialElements.length + 1; i++) {
            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_circle]')
                    .should('have.css', 'border-color', defaultColor)
            })
        }

        cy.get('div[class^=circle_small]').should('not.exist');
        cy.get('[data-cy="list-input-value"]').should('have.value', '');
    })


    it('should add element 8 to tail', () => {
        cy.clock()

        let value = '8'

        cy.get('[data-cy="list-input-value"]').type(value);
        cy.get('[data-cy="list-add-to-tail"]').click()

        cy.get('div[class*=circle_small]').should('exist');
        cy.get('div[class*=circle_small]')
            .should('have.text', value)
            .should('have.css', 'border-color', changingColor)

        cy.tick(DELAY_IN_MS);

        cy.get('div[class^=circle_content]').then((circle) => {
            cy.wrap(circle)
                .eq(initialElements.length)
                .find('[class*=circle_letter]')
                .should('have.text', value)
            cy.wrap(circle)
                .eq(initialElements.length)
                .find('[class*=circle_tail]')
                .should('have.text', 'tail')
            cy.wrap(circle)
                .eq(initialElements.length)
                .find('[class*=circle_circle]')
                .should('have.css', 'border-color', modifiedColor)
        })

        cy.tick(DELAY_IN_MS);

        cy.get('div[class^=circle_content]').should('have.length', initialElements.length + 1);

        for (let i = 0; i < initialElements.length + 1; i++) {
            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find('[class*=circle_circle]')
                    .should('have.css', 'border-color', defaultColor)
            })
        }

        cy.get('div[class^=circle_small]').should('not.exist');
        cy.get('[data-cy="list-input-value"]').should('have.value', '');
    })


    it('should add element 7 by index 2', () => {
        cy.clock()

        let value = '7'
        let index = 2

        cy.get('[data-cy="list-input-value"]').type(value);
        cy.get('[data-cy="list-input-index"]').type(`${('{uparrow}').repeat(index)}`).trigger('change')

        cy.get('[data-cy="list-add-by-index"]').click()

        let resultArray = [...initialElements]
        resultArray.splice(index, 0, +value)

        cy.get('div[class*=circle_small]').should('exist');
        cy.get('div[class*=circle_small]')
            .should('have.text', value)
            .should('have.css', 'border-color', changingColor)

        for (let k = 0; k <= index + 1; k++) {
            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .find('[class*=circle_circle]')
                    .should('have.css', 'border-color', changingColor)
                cy.tick(SHORT_DELAY_IN_MS);
            })
        }

        cy.get('div[class*=circle_small]').should('not.exist');

        cy.get('div[class^=circle_content]').then((circle) => {
            cy.wrap(circle)
                .eq(index)
                .find('[class*=circle_circle]')
                .should('have.css', 'border-color', modifiedColor)
        })

        cy.tick(SHORT_DELAY_IN_MS);

        for (let k = 0; k < resultArray.length; k++) {
            cy.get('div[class^=circle_content]').then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .find('[class*=circle_circle]')
                    .should('have.css', 'border-color', defaultColor)
                cy.wrap(circle)
                    .eq(k)
                    .find('[class*=circle_circle]')
                    .should('have.text', resultArray[k])
            })
        }
    })


    it('should remove head element', () => {
        cy.clock()

        cy.get('[data-cy="list-remove-from-head"]').click()

        cy.get('div[class*=circle_small]').should('exist');
        cy.get('div[class*=circle_small]')
            .should('have.text', initialElements[0])
            .should('have.css', 'border-color', changingColor)

        cy.get('div[class*=circle_default]').then((circle) => {
            cy.wrap(circle)
                .eq(initialElements[0])
                .should('have.text', '')
        })

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('div[class*=circle_default]').then((circle) => {
            expect(circle).length.to.have.length(initialElements.length - 1);
        });
    })


    it('should remove tail element', () => {
        cy.clock()

        cy.get('[data-cy="list-remove-from-tail"]').click()

        cy.get('div[class*=circle_small]').should('exist');
        cy.get('div[class*=circle_small]')
            .should('have.text', initialElements[initialElements.length - 1])
            .should('have.css', 'border-color', changingColor)

        cy.get('div[class*=circle_default]').then((circle) => {
            cy.wrap(circle)
                .eq(initialElements.length - 1)
                .should('have.text', '')
        })

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('div[class*=circle_default]').then((circle) => {
            expect(circle).length.to.have.length(initialElements.length - 1);
        });
    })


    it('should remove element by index 2', () => {
        cy.clock()

        let index = 2

        cy.get('[data-cy="list-input-index"]').type(`${('{uparrow}').repeat(index)}`).trigger('change')

        cy.get('[data-cy="list-remove-by-index"]').click()

        let resultArray = [...initialElements]
        let deletedElement = resultArray.splice(index, 1)

        for (let k = 0; k <= index; k++) {
            cy.get('div[class^=circle_content]').then((circle) => {
                cy.tick(DELAY_IN_MS);
                cy.wrap(circle)
                    .eq(k)
                    .find('[class*=circle_circle]')
                    .should('have.css', 'border-color', changingColor)
            })
        }

        cy.tick(DELAY_IN_MS);

        cy.get('div[class*=circle_small]').should('exist');
        cy.get('div[class*=circle_small]')
            .should('have.text', deletedElement[0])
            .should('have.css', 'border-color', changingColor)

        cy.get('div[class*=circle_circle]').then((circle) => {
            cy.wrap(circle)
                .eq(index)
                .should('have.text', '')
        })

        cy.tick(DELAY_IN_MS);

        cy.get('div[class*=circle_small]').should('not.exist');

        cy.get('div[class*=circle_circle]').then((circle) => {
            cy.wrap(circle)
                .eq(index - 1)
                .should('have.css', 'border-color', modifiedColor)
        })
    })
}); 