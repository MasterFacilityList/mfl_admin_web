"use strict";

angular.module("mfl.auth.routers", [])

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