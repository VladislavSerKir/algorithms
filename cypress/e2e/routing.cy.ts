describe('Routing works correctly', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
    });

    it('Pathname /recursion works correctly', () => {
        cy.get('[data-cy="recursion"]').click()
        cy.contains('Строка')
    })
    it('Pathname /fibonacci works correctly', () => {
        cy.get('[data-cy="fibonacci"]').click()
        cy.contains('Последовательность Фибоначчи')
    })
    it('Pathname /sorting works correctly', () => {
        cy.get('[data-cy="sorting"]').click()
        cy.contains('Сортировка массива')
    })
    it('Pathname /stack works correctly', () => {
        cy.get('[data-cy="stack"]').click()
        cy.contains('Стек')
    })
    it('Pathname /queue works correctly', () => {
        cy.get('[data-cy="queue"]').click()
        cy.contains('Очередь')
    })
    it('Pathname /list works correctly', () => {
        cy.get('[data-cy="list"]').click()
        cy.contains('Связный список')
    })
}); 