import { baseUrl, changingColor, classCircleCircle, classCircleHead, classCircleLetter, classCircleTail, datacyListAddByIndex, datacyListAddHead, datacyListAddTail, datacyListInputIndex, datacyListInputValue, datacyListRemoveByIndex, datacyListRemoveHead, datacyListRemoveTail, defaultColor, DELAY_IN_MS, divClassCircleCircle, divClassCircleContent, divClassCircleDefault, divClassCircleSmall, modifiedColor, SHORT_DELAY_IN_MS } from "../support/constants";

describe('Module list works correctly', function () {
    const initialElements = [0, 34, 8, 1];

    beforeEach(function () {
        cy.visit(`${baseUrl}/list`);
    });

    it('should disable button while empty input', () => {
        cy.get(datacyListInputValue).should('have.value', '');
        cy.get(datacyListAddHead).should('be.disabled')
        cy.get(datacyListAddTail).should('be.disabled')
        cy.get(datacyListAddByIndex).should('be.disabled')
        cy.get(datacyListRemoveByIndex).should('be.disabled')
    })


    it(`should form initial consequence of elements [${initialElements}]`, () => {
        cy.clock()

        for (let i = 0; i < initialElements.length; i++) {
            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleLetter)
                    .should('have.text', initialElements[i])

                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleHead)
                    .should('have.text', i === 0 ? 'head' : '');

                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleTail)
                    .should('have.text', i === initialElements.length - 1 ? 'tail' : '');
            })
        }
    })


    it('should add element 8 to head', () => {
        cy.clock()

        let value = '8'

        cy.get(datacyListInputValue).type(value);
        cy.get(datacyListAddHead).click()

        cy.get(divClassCircleSmall).should('exist');
        cy.get(divClassCircleSmall)
            .should('have.text', value)
            .should('have.css', 'border-color', changingColor)

        cy.tick(DELAY_IN_MS);

        cy.get(divClassCircleContent).then((circle) => {
            cy.wrap(circle)
                .eq(0)
                .find(classCircleLetter)
                .should('have.text', value)
            cy.wrap(circle)
                .eq(0)
                .find(classCircleHead)
                .should('have.text', 'head')
            cy.wrap(circle)
                .eq(0)
                .find(classCircleCircle)
                .should('have.css', 'border-color', modifiedColor)
        })

        cy.tick(DELAY_IN_MS);

        cy.get(divClassCircleContent).should('have.length', initialElements.length + 1);

        for (let i = 0; i < initialElements.length + 1; i++) {
            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleCircle)
                    .should('have.css', 'border-color', defaultColor)
            })
        }

        cy.get(divClassCircleSmall).should('not.exist');
        cy.get(datacyListInputValue).should('have.value', '');
    })


    it('should add element 8 to tail', () => {
        cy.clock()

        let value = '8'

        cy.get(datacyListInputValue).type(value);
        cy.get(datacyListAddTail).click()

        cy.get(divClassCircleSmall).should('exist');
        cy.get(divClassCircleSmall)
            .should('have.text', value)
            .should('have.css', 'border-color', changingColor)

        cy.tick(DELAY_IN_MS);

        cy.get(divClassCircleContent).then((circle) => {
            cy.wrap(circle)
                .eq(initialElements.length)
                .find(classCircleLetter)
                .should('have.text', value)
            cy.wrap(circle)
                .eq(initialElements.length)
                .find(classCircleTail)
                .should('have.text', 'tail')
            cy.wrap(circle)
                .eq(initialElements.length)
                .find(classCircleCircle)
                .should('have.css', 'border-color', modifiedColor)
        })

        cy.tick(DELAY_IN_MS);

        cy.get(divClassCircleContent).should('have.length', initialElements.length + 1);

        for (let i = 0; i < initialElements.length + 1; i++) {
            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(i)
                    .find(classCircleCircle)
                    .should('have.css', 'border-color', defaultColor)
            })
        }

        cy.get(divClassCircleSmall).should('not.exist');
        cy.get(datacyListInputValue).should('have.value', '');
    })


    it('should add element 7 by index 2', () => {
        cy.clock()

        let value = '7'
        let index = 2

        cy.get(datacyListInputValue).type(value);
        cy.get(datacyListInputIndex).type(`${('{uparrow}').repeat(index)}`).trigger('change')

        cy.get(datacyListAddByIndex).click()

        let resultArray = [...initialElements]
        resultArray.splice(index, 0, +value)

        cy.get(divClassCircleSmall).should('exist');
        cy.get(divClassCircleSmall)
            .should('have.text', value)
            .should('have.css', 'border-color', changingColor)

        for (let k = 0; k <= index + 1; k++) {
            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .find(classCircleCircle)
                    .should('have.css', 'border-color', changingColor)
                cy.tick(SHORT_DELAY_IN_MS);
            })
        }

        cy.get(divClassCircleSmall).should('not.exist');

        cy.get(divClassCircleContent).then((circle) => {
            cy.wrap(circle)
                .eq(index)
                .find(classCircleCircle)
                .should('have.css', 'border-color', modifiedColor)
        })

        cy.tick(SHORT_DELAY_IN_MS);

        for (let k = 0; k < resultArray.length; k++) {
            cy.get(divClassCircleContent).then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .find(classCircleCircle)
                    .should('have.css', 'border-color', defaultColor)
                cy.wrap(circle)
                    .eq(k)
                    .find(classCircleCircle)
                    .should('have.text', resultArray[k])
            })
        }
    })


    it('should remove head element', () => {
        cy.clock()

        cy.get(datacyListRemoveHead).click()

        cy.get(divClassCircleSmall).should('exist');
        cy.get(divClassCircleSmall)
            .should('have.text', initialElements[0])
            .should('have.css', 'border-color', changingColor)

        cy.get(divClassCircleDefault).then((circle) => {
            cy.wrap(circle)
                .eq(initialElements[0])
                .should('have.text', '')
        })

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(divClassCircleDefault).then((circle) => {
            expect(circle).length.to.have.length(initialElements.length - 1);
        });
    })


    it('should remove tail element', () => {
        cy.clock()

        cy.get(datacyListRemoveTail).click()

        cy.get(divClassCircleSmall).should('exist');
        cy.get(divClassCircleSmall)
            .should('have.text', initialElements[initialElements.length - 1])
            .should('have.css', 'border-color', changingColor)

        cy.get(divClassCircleDefault).then((circle) => {
            cy.wrap(circle)
                .eq(initialElements.length - 1)
                .should('have.text', '')
        })

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(divClassCircleDefault).then((circle) => {
            expect(circle).length.to.have.length(initialElements.length - 1);
        });
    })


    it('should remove element by index 2', () => {
        cy.clock()

        let index = 2

        cy.get(datacyListInputIndex).type(`${('{uparrow}').repeat(index)}`).trigger('change')

        cy.get(datacyListRemoveByIndex).click()

        let resultArray = [...initialElements]
        let deletedElement = resultArray.splice(index, 1)

        for (let k = 0; k <= index; k++) {
            cy.get(divClassCircleContent).then((circle) => {
                cy.tick(DELAY_IN_MS);
                cy.wrap(circle)
                    .eq(k)
                    .find(classCircleCircle)
                    .should('have.css', 'border-color', changingColor)
            })
        }

        cy.tick(DELAY_IN_MS);

        cy.get(divClassCircleSmall).should('exist');
        cy.get(divClassCircleSmall)
            .should('have.text', deletedElement[0])
            .should('have.css', 'border-color', changingColor)

        cy.get(divClassCircleCircle).then((circle) => {
            cy.wrap(circle)
                .eq(index)
                .should('have.text', '')
        })

        cy.tick(DELAY_IN_MS);

        cy.get(divClassCircleSmall).should('not.exist');

        cy.get(divClassCircleCircle).then((circle) => {
            cy.wrap(circle)
                .eq(index - 1)
                .should('have.css', 'border-color', modifiedColor)
        })
    })
}); 