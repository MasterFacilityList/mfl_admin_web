"use strict";

angular.module("mfl.users.routes", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("users", {
                url: "/users",
                views: {
                    "main": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/main.tpl.html"
                    },
                    "header@users": {
                        controller: "mfl.home.controllers.home",
                        templateUrl: "home/tpls/header.tpl.html"
                    },
                    "sidebar@users": {
                        templateUrl: "home/tpls/side_nav.tpl.html"
                    },
                    "main-content@users": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/index.tpl.html"
                    }
                },
                data : { pageTitle: "Users" }
            });
    }]);
