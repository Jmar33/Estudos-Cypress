/// <reference types="Cypress" />

describe("My Firts Test Suite", function () {
  it("My FirstTest case", function () {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca"); //Usamos o get para selecionar um elemento na página web, como um button ou input
    cy.wait(2000);
    cy.get(".product:visible").should("have.length", 4); //podemos usar a pseudo classe visible para considerarmos apenas os elementos que estão visíveis na tela
    cy.get(".products").find(".product").should("have.length", 4); //Com o find podemos buscar elementos filhos de um determinado elemento css
    cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click(); //Podemos usar o método eq para selecionarmos um elemento específico dentro de um array por meio de seu index
    // Já o método contains seleciona o elemento que contém determinado texto
  });
});
