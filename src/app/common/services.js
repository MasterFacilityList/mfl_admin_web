"use strict";

angular.module("mfl.common.services", [])

    .service("mfl.common.services.localForage", [function () {
        this.getItem = function (key) {
            localforage.getItem(key).then(function(value) {
                console.log(value);
                return JSON.parse(value);
            });
        };
        this.setItem = function (key, value) {
            localforage.setItem(key, value, function(err, value) {
                // Do other things once the value has been saved.
                console.log(err, value);
                return value;
            });
        };
        this.removeItem = function (key) {
            localforage.removeItem(key, function(err) {
                // Run this code once the key has been removed.
                console.log("Key is cleared!", err);
            });
        };
        this.clear = function () {
            localforage.clear(function(err) {
                // Run this code once the database has been entirely deleted.
                console.log(err);
            });
        };
        return;
    }])

    .service("mfl.common.services.localStorage", [function () {
        this.getItem = function (key) {
            return JSON.parse(localStorage.getItem(key));
        };
        this.setItem = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        };
        this.removeItem = function (key) {
            localStorage.removeItem(key);
        };
        this.dumpScope = function (scope, location) {
            var dump = {
                location : location,
                scope : (_.isUndefined(scope.data) || _.isNull(scope.data)) ? {} : scope.data
            };
            this.setItem("dump", dump);
        };
        this.loadScope = function () {
            this.getItem("dump");
        };
        this.clear = function () {
            localStorage.clear();
        };
        return;
    }]);
