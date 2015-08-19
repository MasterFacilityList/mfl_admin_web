exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    multiCapabilities: [{
        "browserName": "firefox"
    }, {
        "browserName": "chrome"
    }],

    baseUrl: "http://localhost:8062/",

    framework: "jasmine",

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
