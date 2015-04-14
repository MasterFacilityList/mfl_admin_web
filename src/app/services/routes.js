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
            })
            .state("services.new_service", {
                url: "/newservice",
                views: {
                    "main-content@services": {
                        controller: "mfl.services.controllers.new_service",
                        templateUrl: "services/tpls/new_service.tpl.html"
                    }
                }
            })
            .state("services.edit_service", {
                url: "/editservice/:service_id",
                views: {
                    "main-content@services": {
                        controller: "mfl.services.controllers.edit_service",
                        templateUrl: "services/tpls/new_service.tpl.html"
                    }
                }
            })
            .state("services.view_service", {
                url: "/viewservice/:service_id",
                views: {
                    "main-content@services": {
                        controller: "mfl.services.controllers.view_service",
                        templateUrl: "services/tpls/view_service.tpl.html"
                    }
                }
            });
    }]);
