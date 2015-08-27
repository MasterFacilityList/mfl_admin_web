exports.config = {
//    allScriptsTimeout: 10000,

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    getPageTimeout: 2000,
    
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
