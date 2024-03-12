/// <reference types="Cypress" />
import HomePage from "../pageObjects/homePage";
import ProductPage from "../pageObjects/ProductPage";

describe("Hooks test", function () {
  before(function () {
    //A função fixture nos permite ler qualquer arquivo dentro da pasta fixtures
    //Normalmente os arquivos nessa pasta, contém os valores das variáveis que desejamos
    //Que sejam armazenadas em arquivos externos
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });

  it("Demo test", function () {
    //Podemos usar o comando abaixo para sobrescrever uma propriedade específica para um único teste
    Cypress.config("defaultCommandTimeout", 8000);
    cy.visit(Cypress.env("url") + "/angularpractice/");

    const homePage = new HomePage();
    const productPage = new ProductPage();
    cy.get("input[name='name']:nth-child(2)").type(this.data.name);
    cy.get("select").select(this.data.gender);
    cy.get(":nth-child(4) > .ng-untouched").should(
      "have.value",
      this.data.name
    );

    //Have.attr nos permite testar qualquer valor de atributo para um elemento HTML
    cy.get("input[name='name']:nth-child(2)").should(
      "have.attr",
      "minlength",
      "2"
    );
    cy.get("#inlineRadio3").should("be.disabled"); // Testa se um radio button option está desabilitado
    cy.get(":nth-child(2) > .nav-link").click();
    //podemos definir nossos prórprios comandos em Cypress colocando-os na pasta support commands
    // cy.selectProduct("BlackBerry");

    //Podemos usar o comando cy.pause() para que a nossa aplicação seja congelada em determinado ponto
    //facilitando assim o debbug da aplicação. Além do método pause(), podemos usar também o método debbug()
    //ao final de método, como o click(), por exemplo.
    //cy.pause();

    this.data.productName.forEach(function (element) {
      cy.selectProduct(element);
    });
    productPage.getCheckoutButton().click();

    var sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each(($el, index, list) => {
        const amount = $el.text();
        let res = amount.split(" ");
        res = res[1].trim();
        sum += Number(res);
      })
      .then(function () {
        cy.log(sum);
      });
    cy.get("h3 strong").then(function (element) {
      const amount = element.text();
      let res = amount.split(" ");
      let total = res[1].trim();
      expect(Number(total)).to.equal(sum);
    });

    // cy.pause();

    cy.contains("Checkout").click();
    cy.get("#country").type("India");
    cy.get(".suggestions > ul > li > a").click();
    cy.get("#checkbox2").click({ force: true });
    cy.get('input[type="submit"').click();
    cy.get(".alert").then(function (element) {
      const actualText = element.text();
      expect(actualText.includes("Success")).to.be.true;
    });
  });
});
