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
                "sidenav@facilities": {
                    templateUrl: "facilities/tpls/common/sidenav.tpl.html"
                },
                "header@facilities": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "main-content@facilities": {
                    templateUrl: "facilities/tpls/grid/index.tpl.html",
                    controller: "mfl.facilities.controllers.home.list"
                }
            },
            data : { pageTitle: "Facility Management" }
        })
        .state("facilities.facility_type", {
                url: "/facility_type",
                views: {
                    "main-content@facilities" : {
                        templateUrl : "facilities/tpls/home/facility_type_grid.tpl.html",
                        controller: "mfl.facilities.controllers.home.facility_type"
                    }
                }
            })

        .state("facilities.facility_status", {
                url: "/facility_status",
                views: {
                    "main-content@facilities" : {
                        templateUrl : "facilities/tpls/home/facility_status_grid.tpl.html",
                        controller: "mfl.facilities.controllers.home.facility_status"
                    }
                }
            });
    }]);
})(angular);
