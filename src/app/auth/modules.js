(function (angular) {
    "use strict";

    angular.module("mfl.auth", [
        "mfl.auth.controllers",
        "mfl.auth.services",
        "mfl.auth.routers",
        "mfl.auth.directives",
        "mfl.auth.oauth2"
    ]);

})(angular);
