(function (angular) {
    "use strict";

    angular.module("mfl.auth", [
        "mfl.auth.controllers",
        "angular-toasty",
        "mfl.auth.services",
        "mfl.auth.states",
        "mfl.auth.oauth2"
    ]);

})(window.angular);
