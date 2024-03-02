/// <reference types="Cypress" />

describe("My Firts Test Suite", function () {
  it("My FirstTest case", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    //   Por padrão o Cypress não dá suporte quando abrimos uma nova guia.
    //   Uma alternativa para esses casos é sempre trabalhar na mesma guia, e para isso podemos usar
    //   o Jquery para remover o atributo target de um link, conforme o exemplo.

    cy.get("#opentab").invoke("removeAttr", "target").click();

    //   O Cypress não permite que testemos vários domínios de uma única vez
    //   por isso recebemos um erro de CORS, uma forma de contarnar esse problema
    //   é por meio do método 'origin', que nos permite definir um novo domínio
    cy.origin("https://www.qaclickacademy.com/", () => {
      cy.get("#navbarSupportedContent a[href*='about']").click();
      cy.get(".mt-50 h2").should("contain", "QAClick Academy");
    });
  });
});
