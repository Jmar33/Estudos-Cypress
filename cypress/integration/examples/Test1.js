/// <reference types="Cypress" />

describe("My Firts Test Suite", function () {
  it("My FirstTest case", function () {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca"); //Usamos o get para selecionar um elemento na página web, como um button ou input
    cy.wait(2000);
    cy.get(".product:visible").should("have.length", 4); //podemos usar a pseudo classe visible para considerarmos apenas os elementos que estão visíveis na tela

    cy.get(".products").as("productLocator"); // O comando 'as' nos permite criar um apelido que pode ser usado para referenciar um determinado seletor
    cy.get("@productLocator").find(".product").should("have.length", 4); //Com o find podemos buscar elementos filhos de um determinado elemento css
    cy.get("@productLocator")
      .find(".product")
      .eq(1)
      .contains("ADD TO CART")
      .click(); //Podemos usar o método eq para selecionarmos um elemento específico dentro de um array por meio de seu index
    // Já o método contains seleciona o elemento que contém determinado texto

    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        //O método each percorre um array, executando uma callback que possui três parâmetros, o elemento atual, o índice do elemento, e a própria lista percorrida
        const textVeg = $el.find("h4.product-name").text(); //Retorna o texto de um elemento

        if (textVeg.includes("Cashews")) {
          cy.wrap($el).find("button").click(); // No Cypress o elemento que recebemos dentro do bloco each é uma promise
          //Por isso usamos o método wrap que espera e devolve a promise resolvida
        }
      });

    //O Cypress por padrão é assíncrono mas utiliza de métodos como promisses para ter um comportamento síncrono
    //Assim cada comando do Cypress é uma promisse que é resolvida internamente, sem a necessidade do uso do then, o que nos permite concatenar comandos Cypress
    //em sequência

    //Já quando queremos armazer o valor dessa promisse em uma variável, ou concatenar com um comando Jquery devemos resolver essa promisse manualmente
    //Conforme o exemplo a seguir:

    cy.get(".brand").then((logoElement) => {
      //apenas imprime o texto
      cy.log(logoElement.text());
    });

    //asserção que verifica se o texto está correto

    cy.get(".brand").should("have.text", "GREENKART");

    // cy.get(".brand").text(); -> text não será resolvido por ser um método Jquery

    // const logo = cy.get(".brand"); -> logo será uma promisse e não o elemento com a classe brand
    // logo.text();
  });
});
