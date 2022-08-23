const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eaot46',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
