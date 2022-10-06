describe("smoke tests", () => {
  it("should allow visit page", () => {
    cy.visitAndCheck("/");
  });

  it("should allow you to add and remove menu item to/from cart", () => {
    cy.get('[data-cy="menu-list"] button').click({
      multiple: true,
    });
    cy.get('[data-cy="cart-toggle"] button').click();
    cy.get('[data-cy="cart-list"] button').click({ multiple: true });
  });
});
