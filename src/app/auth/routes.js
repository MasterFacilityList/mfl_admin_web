(function (angular) {
    "use strict";

    angular.module("mfl.auth.routes", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.login",
                        templateUrl: "auth/tpls/main.tpl.html"
                    }
                }
            });
    }]);
})(angular);
