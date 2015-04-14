"use strict";

angular.module("mfl.services.routes", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("services", {
                url: "/services",
                views: {
                    "main": {
                        controller: "mfl.services.controllers.services",
                        templateUrl: "services/tpls/main.tpl.html"
                    },
                    "header@services": {
                        controller: "mfl.services.controllers.services",
                        templateUrl: "home/tpls/header.tpl.html"
                    },
                    "sidebar@services": {
                        templateUrl: "home/tpls/side_nav.tpl.html"
                    },
                    "main-content@services": {
                        controller: "mfl.services.controllers.services",
                        templateUrl: "services/tpls/index.tpl.html"
                    }
                },
                data : { pageTitle: "Services" }
            });
    }]);
