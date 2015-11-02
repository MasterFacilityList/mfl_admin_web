"use strict";


var protractorConfig = {

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    getPageTimeout: 2000,

    multiCapabilities: [
        { "browserName": "chrome" }
    ],

    baseUrl: "http://localhost:8062/",

    framework: "jasmine",

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: parseInt(process.env.DEFAULT_TIMEOUT_INTERVAL, 10) || 30000,
        isVerbose: true,
        includeStackTrace: true,
        realtimeFailure: false
    },

    directConnect: true,

    params: {
        page_timeout:  parseInt(process.env.E2E_PAGE_TIMEOUT, 10) || 3000,
        users: {
            national_admin: {
                username: "10001",
                password: "password1"
            },
            chrio: {
                username: "10007",
                password: "password1"
            },
            schrio: {
                username: "10012",
                password: "password1"
            },
            regulator: {
                username: "10014",
                password: "password1"
            },
            reporting: {
                username: "reporting@mfltest.slade360.co.ke",
                password: "password1"
            },
            public_user: {
                username: "public@mfltest.slade360.co.ke",
                password: "public"
            }
        }
    }
};

if (process.env.RUN_SAUCE_TESTS === "true") {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        throw new Error("SauceLabs credentials not set");
    }
    protractorConfig.sauceUser = process.env.SAUCE_USERNAME;
    protractorConfig.sauceKey = process.env.SAUCE_ACCESS_KEY;
    protractorConfig.getMultiCapabilities = null;
    protractorConfig.onPrepare = function () {};
    protractorConfig.directConnect = false;
    protractorConfig.multiCapabilities = [
        {
            "build": process.env.CIRCLE_BUILD_NUM,
            "name": "MFL Admin App E2E Testing",
            "browserName": "chrome",
            "version": "45"
        }
    ];
}

exports.config = protractorConfig;
