var HtmlReporter = require("protractor-html-screenshot-reporter");
var q = require("q");

var today = new Date(),
    timeStamp = today.getMonth() + 1 + "-" + today.getDate() +
    "-" + today.getFullYear() + "-" + today.getHours() +
    "h-" + today.getMinutes() + "m";

exports.config = {

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    getPageTimeout: 2000,

    getMultiCapabilities: function() {
        var deferred = q.defer();

        var multiCapabilities = [
            {
                browserName: "firefox"
            },
            {
                browserName: "chrome"
            }
        ];
        // Wait for a server to be ready or get capabilities asynchronously.
        setTimeout(function() {
                deferred.resolve(multiCapabilities);
        }, 2000);
        return deferred.promise;
    },

    maxSessions: 1,

    baseUrl: "http://localhost:8062/",

    framework: "jasmine",

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: "./protractor_results/",
            docTitle: "Protractor - Firefox Report",
            docName: "protractor-firefox-report-"+timeStamp+".html"
      }));
    }
};
