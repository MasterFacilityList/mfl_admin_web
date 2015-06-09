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
                requireUser: false
            })

            .state("logout", {
                url: "/logout",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.logout",
                        templateUrl: "auth/tpls/main.tpl.html"
                    }
                },
                requireUser: false
            })

            .state("reset_pwd", {
                url: "/reset_pwd",
                views: {
                    "main": {
                        controller: "mfl.auth.controller.reset_pwd",
                        templateUrl: "auth/reset_pwd.tpl.html"
                    }
                },
                requireUser: false
            })

            .state("reset_pwd_confirm", {
                url: "/reset_pwd_confirm?uid&token",
                views: {
                    "main": {
                        controller: "mfl.auth.controller.reset_pwd_confirm",
                        templateUrl: "auth/reset_pwd_confirm.tpl.html"
                    }
                },
                requireUser: false
            });
    }]);
})(angular);
