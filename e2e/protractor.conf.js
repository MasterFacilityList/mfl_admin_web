exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    "../src/app/**/*.e2e.js"
  ],

  capabilities: {
    "browserName": "chrome"
  },

  baseUrl: "http://localhost:8062/",

  framework: "jasmine",

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};