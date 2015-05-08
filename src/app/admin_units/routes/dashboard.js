"use strict";
(function(angular){
    angular.module("mfl.admin_units.routes.dashboard", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("admin_units", {
                url: "/adminstrativeareas",
                views: {
                    "main": {
                        controller: "mfl.admin_units.controllers.admin_units",
                        templateUrl: "admin_units/tpls/dashboard/main.tpl.html"
                    },
                    "header@admin_units": {
                        controller: "mfl.admin_units.controllers.admin_units",
                        templateUrl: "home/tpls/header.tpl.html"
                    },
                    "sidebar@admin_units": {
                        templateUrl: "home/tpls/side_nav.tpl.html"
                    },
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.admin_units",
                        templateUrl: "admin_units/tpls/dashboard/index.tpl.html"
                    }
                },
                data : { pageTitle: "Administative-areas"}
            });
    }]);
})(angular);
