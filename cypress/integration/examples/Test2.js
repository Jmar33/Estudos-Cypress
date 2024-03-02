/// <reference types="Cypress" />

describe("My Firts Test Suite", function () {
  it("My FirstTest case", function () {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);

    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text(); //Retorna o texto de um elemento

        if (textVeg.includes("Cashews")) {
          cy.wrap($el).find("button").click(); // No Cypress o elemento que recebemos dentro do bloco each é uma promise
          //Por isso usamos o método wrap que espera e devolve a promise resolvida
        }
      });

    cy.get(".cart-icon > img").click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.contains("Place Order").click();
  });
});
