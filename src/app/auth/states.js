(function (angular) {
    "use strict";

    angular.module("mfl.auth.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("login", {
                url: "/login?next",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.login",
                        templateUrl: "auth/tpls/main.tpl.html"
                    }
                },
                data : { pageTitle: "Login" }
            })
            .state("logout", {
                url: "/logout",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.logout",
                        templateUrl: "auth/tpls/main.tpl.html"
                    }
                }
            });
    }]);
})(angular);
