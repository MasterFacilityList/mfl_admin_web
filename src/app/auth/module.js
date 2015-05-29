(function (angular) {
    "use strict";

    angular.module("mfl.auth", [
        "mfl.auth.controllers",
        "mfl.auth.services",
        "mfl.auth.routes",
        "mfl.auth.oauth2"
    ]);

})(angular);
