"use strict";


var protractorConfig = {

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    getPageTimeout: 2000,

    multiCapabilities: [
        {
            browserName: "chrome"
        }
        // { browserName: "firefox" }
    ],

    baseUrl: "http://localhost:8062/",

    framework: "jasmine",

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true,
        realtimeFailure: false
    },

    directConnect: true,

    params: {
        users: {
            national_admin: {
                username: "10001",
                password: "national_admin"
            },
            chrio: {
                username: "10007",
                password: "nairobi"
            },
            schrio: {
                username: "10012",
                password: "mathare"
            },
            regulator: {
                username: "10014",
                password: "kmpdb"
            },
            reporting: {
                username: "reporting@mfltest.slade360.co.ke",
                password: "reporting"
            },
            public_user: {
                username: "public@mfltest.slade360.co.ke",
                password: "public"
            },
            facility_officer: {
                username: "facility_officer@mfltest.slade360.co.ke",
                password: "facility_officer"
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
