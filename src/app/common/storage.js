(function (angular) {
    "use strict";

    angular.module("mfl.common.storage", [])

    .service("mfl.common.storage.localStorage", ["$window",
        function ($window) {
            var localstorage = $window.localStorage;

            this.getItem = function (key) {
                return JSON.parse(localstorage.getItem(key));
            };
            this.setItem = function (key, value) {
                localstorage.setItem(key, JSON.stringify(value));
            };
            this.removeItem = function (key) {
                localstorage.removeItem(key);
            };
            this.clear = function () {
                localstorage.clear();
            };
        }
    ]);

})(angular);
