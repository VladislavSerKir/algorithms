import { baseUrl, changingColor, classCircleHead, classCircleTail, datacyQueueButton, datacyQueueClear, datacyQueueDelete, datacyQueueInput, defaultColor, DELAY_IN_MS, divClassCircleCircle, divClassCircleContent } from "../support/constants";

describe('Module queue works correctly', function () {
    const addedElements = ['a', 'b', 'c', 'd', 'e']

    const createElements = () => {
        for (let i = 0; i < addedElements.length; i++) {
            cy.tick(DELAY_IN_MS)
            cy.get(datacyQueueInput).type(addedElements[i]);
            cy.get(datacyQueueButton).click()
            cy.tick(DELAY_IN_MS)
        }
    }

    beforeEach(function () {
        cy.visit(`${baseUrl}/queue`);
    });

    it('should disable button while empty input', () => {
        cy.get(datacyQueueInput).should('have.value', '');
        cy.get(datacyQueueButton).should('be.disabled')
        cy.get(datacyQueueClear).should('be.disabled')
        cy.get(datacyQueueDelete).should('be.disabled')
    })


    it('should add elements to queue', () => {
        cy.clock()

        for (let i = 0; i < addedElements.length; i++) {
            cy.get(datacyQueueInput).type(addedElements[i]);
            cy.get(datacyQueueButton).click()

            cy.get(divClassCircleCircle).then((circle) => {
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

            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleHead)
                    .should('have.text', i === 0 ? 'head' : '');
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleTail)
                    .contains('tail');
            });
        }
    })


    it('should clear all elements from queue', () => {
        cy.clock()

        createElements()

        cy.get(datacyQueueClear).click();
        cy.tick(DELAY_IN_MS);

        for (let i = 0; i < addedElements.length; i++) {

            cy.get(divClassCircleCircle).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .should('have.css', 'border-color', defaultColor)
                    .should('have.text', '')
            })

            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleHead)
                    .should('have.text', '');
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleTail)
                    .should('have.text', '');
            });
        }

        cy.tick(DELAY_IN_MS);

        cy.get(datacyQueueClear).should('be.disabled')
        cy.get(datacyQueueButton).should('be.disabled')
        cy.get(datacyQueueDelete).should('be.disabled')
    })


    it('should remove element from queue', () => {
        cy.clock()

        createElements()

        cy.get(divClassCircleCircle).then((circle) => {
            expect(circle).length.to.have.length(7);
        });

        cy.tick(DELAY_IN_MS)

        for (let k = 0; k < addedElements.length; k++) {
            cy.get(datacyQueueDelete).click();

            cy.get(divClassCircleCircle).then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .should('have.css', 'border-color', changingColor)
            })

            cy.tick(DELAY_IN_MS)

            cy.get(divClassCircleCircle).then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .should('have.css', 'border-color', defaultColor)
                    .should('have.text', '');
            })

            if (k < addedElements.length - 1) {
                cy.get(divClassCircleCircle).then((circle) => {
                    cy.wrap(circle)
                        .eq(k)
                        .find(classCircleHead)
                        .should('not.exist');
                });
            } else {
                cy.get(datacyQueueDelete).should('be.disabled');
            }

            cy.tick(DELAY_IN_MS)
        }
    })
}); 