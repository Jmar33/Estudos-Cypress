/// <reference types="Cypress" />

describe("Calendar test", function () {
  it("First test", function () {
    const date = "15";
    const month = "6";
    const year = "2027";

    const expectedList = [month, date, year];
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.get(".react-date-picker__inputGroup").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.contains("button", year).click();
    cy.get(".react-calendar__year-view__months__month")
      .eq(Number(month) - 1)
      .click();
    cy.contains("abbr", date).click();

    cy.get(".react-date-picker__inputGroup__input").each(($e1, index) => {
      cy.wrap($e1).invoke("val").should("eq", expectedList[index]);
    });
  });
});
