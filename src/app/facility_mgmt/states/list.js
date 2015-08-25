(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.list", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities", {
            parent: "facility_mgmt",
            url: "^/facilities/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_list"
                }
            },
            permission: "facilities.view_facility"
        })
        .state("facility_approve_list", {
            parent: "facility_mgmt",
            url: "^/facility_approve_list/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_approved.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve_list"
                }
            },
            permission: "facilities.view_facility"
        })
        .state("facility_reject_list", {
            "parent": "facility_mgmt",
            "url": "^/facility_reject_list/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.rejected.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_rejected"
                }
            },
            permission: "facilities.view_facility"
        });
    }]);

})(window.angular);
