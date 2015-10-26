(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name mfl.auth
     *
     * @description
     * Authentication and authorization module
     */

    angular.module("mfl.auth", [
        "mfl.auth.controllers",
        "mfl.auth.services",
        "mfl.auth.states",
        "mfl.auth.oauth2"
    ]);

})(window.angular);
