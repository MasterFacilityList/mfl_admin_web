"use strict";

angular.module("mfl.admin_units.routes", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("admin_units", {
                url: "/adminstrativeareas",
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
            .state("admin_units.counties", {
                url: "/counties",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.counties",
                        templateUrl: "admin_units/tpls/counties.tpl.html"
                    }
                }
            })
            .state("admin_units.counties.view_consts", {
                url: "/constituencies/:count_id",
                views: {
                    "main-content@admin_units": {
                        templateUrl: "admin_units/tpls/constituencies.tpl.html",
                        controller: "mfl.admin_units.controllers.counties.consts"
                    }
                }
            })
            .state("admin_units.counties.edit", {
                url: "/edit/:count_id",
                views: {
                    "main-content@admin_units": {
                        templateUrl: "admin_units/tpls/edit_county.tpl.html"
                    }
                }
            })
            .state("admin_units.constituencies", {
                url: "/constituencies",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.constituencies",
                        templateUrl: "admin_units/tpls/constituencies.tpl.html"
                    }
                }
            })
            .state("admin_units.constituencies.view_wards", {
                url: "/wards/:const_id",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.constituencies.wards",
                        templateUrl: "admin_units/tpls/wards.tpl.html"
                    }
                }
            })
            .state("admin_units.constituencies.edit", {
                url: "/edit/:const_id",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.constituencies",
                        templateUrl: "admin_units/tpls/constituencies.tpl.html"
                    }
                }
            })
            .state("admin_units.wards", {
                url: "/wards",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.wards",
                        templateUrl: "admin_units/tpls/wards.tpl.html"
                    }
                }
            })
            .state("admin_units.towns", {
                url: "/towns",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.towns",
                        templateUrl: "admin_units/tpls/towns.tpl.html"
                    }
                }
            });
    }]);
