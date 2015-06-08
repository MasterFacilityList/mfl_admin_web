(function (angular) {
    "use strict";

    angular.module("mfl.auth", [
        "mfl.auth.controllers",
        "mfl.auth.services",
        "mfl.auth.states",
        "mfl.auth.oauth2"
    ]);

})(angular);
