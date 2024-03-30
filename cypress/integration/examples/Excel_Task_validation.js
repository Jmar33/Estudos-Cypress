/// <reference types="Cypress" />
import neatCSV from "neat-csv";

let productName;
describe("JWT Session", () => {
  it("is logged in through local storage", async () => {
    cy.LoginAPI().then(function () {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });

    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get("[routerlink*='cart'").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("ind");
    cy.get(".ta-results button").each(($e1, index, $list) => {
      if ($e1.text === "India") {
        cy.wrap($e1).click();
        cy.log("cliquei");
      }
    });
    cy.wait(2000);
    cy.get(".action__submit").click();
    cy.wait(2000);
    cy.get(".order-summary button").contains("Excel").click();

    const fileServerFolder = Cypress.config("fileServerFolder");
    const filePath =
      fileServerFolder + "/cypress/downloads/order-invoice_josimar.xlsx";
    cy.task("excelToJsonConverter", filePath).then(function (result) {
      cy.log(result.data[0].A);
      expect(productName).to.equal(result.data[0].B);
    });

    cy.readFile(filePath).then(function (text) {
      expect(text).to.include(productName); //Nesse caso diferente da task que criamos todo o conteúdo do excel é transformado em uma única string de texto
    });
  });
});
