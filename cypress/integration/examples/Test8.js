/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import "cypress-iframe"; //Para trabalharmos com iframes no Cypress precisamos importar a lib cypress-iframe

describe("Frames test", function () {
  it("Demo test", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.frameLoaded("#courses-iframe");

    //Todas as vezes que vamos acessar um conteúdo dentro de um iframe e não da página principal, devemos
    //utilizar o método iframe
    cy.iframe().find("a[href*='mentorship']").eq(0).click();
    cy.wait(2000);
    cy.iframe().find("h1[class*='pricing-title']").should("have.length", 2);
  });
});
