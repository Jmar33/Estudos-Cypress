/// <reference types="Cypress" />

describe("My fake http test suite", () => {
  it("My second http request fake test", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
      }
    ).as("dummyUrl"); // Armazena o request em uma promise
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@dummyUrl");
  });
});
