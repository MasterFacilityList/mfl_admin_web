(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("facility_mgmt", {
                url: "/facility_mgmt",
                views: {
                    "main": {
                        templateUrl: "common/tpls/main-no-sidenav.tpl.html"
                    },
                    "header@facility_mgmt": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "body@facility_mgmt" : {
                        templateUrl : "facility_mgmt/tpls/body.tpl.html"
                    }
                },
                data : { pageTitle: "Facility Management" },
                redirectTo: "facility_mgmt.facilities",
                permission: "facilities.view_facility"
            })
            .state("facility_mgmt.facilities", {
                url: "^/facilities/",
                views: {
                    "main-content@facility_mgmt": {
                        templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_list"
                    }
                },
                permission: "facilities.view_facility"
            });
    }]);

})(angular);
