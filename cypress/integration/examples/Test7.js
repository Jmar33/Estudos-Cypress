/// <reference types="Cypress" />

describe("My Firts Test Suite", function () {
  it("My FirstTest case", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("div.mouse-hover-content").invoke("show");
    cy.contains("Top").click({ force: true }); // A propriedade force nos permite clicar inclusive em elementos que não estão visíveis
    cy.url().should("include", "top");
  });
});
