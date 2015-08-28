exports.config = {

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    getPageTimeout: 2000,
    
    multiCapabilities: [
        {
            "browserName": "chrome"
        },
        {
            "browserName": "firefox"
        }
    ],

    maxSessions: 1,

    baseUrl: "http://localhost:8062/",

    framework: "jasmine",

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
