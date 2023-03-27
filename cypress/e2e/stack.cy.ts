import { baseUrl, changingColor, datacyStackButton, datacyStackClear, datacyStackDelete, datacyStackInput, defaultColor, DELAY_IN_MS, divClassCircleCircle, SHORT_DELAY_IN_MS } from "../support/constants";

describe('Module stack works correctly', function () {
    const addedElements = ['a', 'b', 'c', 'd', 'e']

    const createElements = () => {
        for (let i = 0; i < addedElements.length; i++) {
            cy.get(datacyStackInput).type(addedElements[i]);
            cy.get(datacyStackButton).click()
            cy.tick(SHORT_DELAY_IN_MS)
        }
    }

    beforeEach(function () {
        cy.visit(`${baseUrl}/stack`);
    });

    it('should disable button while empty input', () => {
        cy.get(datacyStackInput).should('have.value', '');
        cy.get(datacyStackButton).should('be.disabled')
        cy.get(datacyStackClear).should('be.disabled')
        cy.get(datacyStackDelete).should('be.disabled')
    })


    it('should add elements to stack', () => {
        cy.clock()

        for (let i = 0; i < addedElements.length; i++) {
            cy.get(datacyStackInput).type(addedElements[i]);
            cy.get(datacyStackButton).click()

            cy.get(divClassCircleCircle).then((circle) => {
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

        cy.get(divClassCircleCircle).then((circle) => {
            expect(circle).length.to.have.length(addedElements.length);
        });
        cy.get(divClassCircleCircle).should('have.length', addedElements.length);

        cy.get(divClassCircleCircle).its('length').then((size) => {
            cy.log(size.toString())
        });

        cy.get(datacyStackClear).click();
        cy.get(datacyStackClear).should('be.disabled')
        cy.get(datacyStackButton).should('be.disabled')
        cy.get(datacyStackDelete).should('be.disabled')
        cy.get(divClassCircleCircle).should('not.exist');
        cy.get(divClassCircleCircle).should('have.length', 0);
    })


    it('should remove element from stack', () => {
        cy.clock()

        createElements()

        cy.get(divClassCircleCircle).then((circle) => {
            expect(circle).length.to.have.length(addedElements.length);
        });

        cy.tick(DELAY_IN_MS)

        for (let k = 0; k < addedElements.length; k++) {
            cy.get(datacyStackDelete).click();

            cy.get(divClassCircleCircle).then((circle) => {
                cy.wrap(circle)
                    .eq(addedElements.length - k - 1)
                    .should('have.css', 'border-color', changingColor)
            })

            cy.tick(DELAY_IN_MS)

            if (k < addedElements.length - 1) {
                cy.get(divClassCircleCircle).then((circle) => {
                    expect(circle).length.to.have.length(addedElements.length - k - 1);
                });
            } else {
                cy.get(divClassCircleCircle).should('not.exist');
                cy.get(datacyStackDelete).should('be.disabled');
            }
        }
    })
}); 