const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com",
  },
  retries: {
    runMode: 1, //Testa nosso app novamente em caso de falhas
  },
  projectId: "ci1gop",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/examples/*.js",
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
  },
});
