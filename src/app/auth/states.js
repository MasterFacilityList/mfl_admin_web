(function (angular) {
    "use strict";

    angular.module("mfl.auth.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

            .state("login", {
                url: "/login?next&reset_pwd&reset_pwd_confirm&timeout",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.login",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                },
                requireUser: false
            })

            .state("logout", {
                url: "/logout?next&timeout",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.logout",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            })

            .state("reset_pwd", {
                url: "/reset_pwd",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.reset_pwd",
                        templateUrl: "auth/tpls/reset_pwd.tpl.html"
                    },
                    "header@reset_pwd":{
                        templateUrl: "common/tpls/header-no-login.tpl.html"
                    }
                },
                requireUser: false
            })

            .state("reset_pwd_confirm", {
                url: "/reset_pwd_confirm/:uid/:token",
                views: {
                    "main": {
                        controller: "mfl.auth.controllers.reset_pwd_confirm",
                        templateUrl: "auth/tpls/reset_pwd_confirm.tpl.html"
                    },
                    "header@reset_pwd_confirm":{
                        templateUrl: "common/tpls/header-no-login.tpl.html"
                    }
                },
                requireUser: false
            });
    }]);
})(window.angular);
