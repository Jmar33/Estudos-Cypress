/// <reference types="Cypress" />
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../pageObjects/homePage";
import ProductPage from "../../../pageObjects/ProductPage";

const homePage = new HomePage();
const productPage = new ProductPage();
let name;
Given("I open ECommerce Page", function () {
  cy.visit(Cypress.env("url") + "/angularpractice/");
});

//When I add items to Cart
When("I add items to Cart", function () {
  homePage.getShopTab().click();

  this.data.productName.forEach(function (element) {
    cy.selectProduct(element);
  });
  productPage.checkOutButton().click();
});

//And validate the total prices
When("Validate the total prices", function () {
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
});

//Then select the country submit and verify Thankyou
Then("select the country submit and verify Thankyou", function () {
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

// When I fill the form details
When("I fill the form details", (dataTable) => {
  name = dataTable.rawTable[1][0];
  homePage.getEditBox().type(dataTable.rawTable[1][0]);
  homePage.getGender().select(dataTable.rawTable[1][1]);
});

//And select the Shop Page
Then("select the Shop Page", () => {
  homePage.getTwoWayDataBinding().should("have.value", name);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  homePage.getEntrepreneaur().should("be.disabled");
  Cypress.config("defaultCommandTimeout", 8000);
});

//Then validate the forms behavior
Then("validate the forms behavior", () => {
  homePage.getShopTab().click();
});
