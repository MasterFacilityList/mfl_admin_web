(function (angular) {
    "use strict";
    angular.module("mfl.facilities.base", [
        "ui.router"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities", {
            url: "/facilities",
            views: {
                "main": {
                    templateUrl: "facilities/tpls/common/main.tpl.html"
                },
                "body@facilities": {
                    templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                },
                "header@facilities": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "main-content@facilities":{
                    controller: "mfl.facilities.controllers.home.base"
                }
            },
            data : { pageTitle: "Facility Management"},
            permission: "facilities.view_facility"
        })
        .state("facilities.list", {
            url: "/list",
            views: {
                "body@facilities": {
                    templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                },
                "main-content@facilities.list": {
                    templateUrl: "facilities/tpls/grid/index.tpl.html",
                    controller: "mfl.facilities.controllers.home.list"
                }
            },
            data : { pageTitle: "Facility Management" },
            permission: "facilities.view_facility"
        })

        .state("facilities.facility_status", {
                url: "/facility_status",
                views: {
                    "body@facilities": {
                        templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                    },
                    "main-content@facilities.facility_status" : {
                        templateUrl : "facilities/tpls/home/facility_status_grid.tpl.html",
                        controller: "mfl.facilities.controllers.home.facility_status"
                    }
                },
                permission: "facilities.view_facilitystatus"
            })

        .state("facilities.facility_status_create", {
                url: "/facility_status/:id",
                views: {
                    "body@facilities": {
                        templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                    },
                    "main-content@facilities.facility_status_create" : {
                        templateUrl : "facilities/tpls/home/facility_status_create.tpl.html",
                        controller: "mfl.facilities.controllers.home.facility_status.create"
                    }
                },
                permission: "facilities.add_facilitystatus"
            })
        .state("facilities.facility_type", {
                url: "/facility_type",
                views: {
                    "body@facilities": {
                        templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                    },
                    "main-content@facilities.facility_type" : {
                        templateUrl : "facilities/tpls/home/facility_type_grid.tpl.html",
                        controller: "mfl.facilities.controllers.home.facility_type"
                    }
                },
                permission: "facilities.view_facilitytype"
            })
        .state("facilities.facility_type_create", {
                url: "/facility_type/:id",
                views: {
                    "body@facilities": {
                        templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                    },
                    "main-content@facilities.facility_type_create" : {
                        templateUrl : "facilities/tpls/home/facility_type_create.tpl.html",
                        controller: "mfl.facilities.controllers.home.facility_type.create"
                    }
                },
                permission: "facilities.add_facilitytype"
            });
    }]);
})(angular);
