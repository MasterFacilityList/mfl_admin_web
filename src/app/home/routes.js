"use strict";
angular.module("mfl.home.routes", [])

    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/home",
                views: {
                    "main": {
                        controller: "mfl.home.controllers.home",
                        templateUrl: "home/tpls/main.tpl.html"
                    },
                    "header@home": {
                        controller: "mfl.home.controllers.home",
                        templateUrl: "home/tpls/header.tpl.html"
                    },
                    "sidebar@home": {
                        templateUrl: "home/tpls/side_nav.tpl.html"
                    },
                    "main-content@home": {
                        controller: "mfl.home.controllers.home",
                        templateUrl: "home/tpls/index.tpl.html"
                    }
                },
                data : { pageTitle: "Home" }
            });
        $urlRouterProvider.otherwise("/login");
    }]);
