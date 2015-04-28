"use strict";

angular.module("mfl.admin_units.routes", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("admin_units", {
                url: "/adminstrativeares",
                views: {
                    "main": {
                        controller: "mfl.admin_units.controllers.admin_units",
                        templateUrl: "admin_units/tpls/main.tpl.html"
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
                        templateUrl: "admin_units/tpls/index.tpl.html"
                    }
                },
                data : { pageTitle: "Administative-areas"}
            })
            .state("admin_units.new_unit", {
                url: "/newadminarea",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.new_unit",
                        templateUrl: "admin_units/tpls/new_unit.tpl.html"
                    }
                }
            })
            .state("admin_units.edit_unit", {
                url: "/editadminarea/:unit_id",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.edit_unit",
                        templateUrl: "admin_units/tpls/new_unit.tpl.html"
                    }
                }
            })
            .state("admin_units.view_unit", {
                url: "/viewadminarea/:unit_id",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.view_unit",
                        templateUrl: "admin_units/tpls/view_unit.tpl.html"
                    }
                }
            });
    }]);
