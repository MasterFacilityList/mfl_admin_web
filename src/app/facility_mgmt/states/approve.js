(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.approve", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("facilities_rejected", {
            "parent": "facility_mgmt",
            "url": "^/facilities_rejected/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_rejected"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve", {
            "parent": "facility_mgmt",
            "url": "^/facilities_approve/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_approve"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve_update", {
            parent: "facility_mgmt",
            url: "^/facilities_approve_update/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_approve_update"
                }
            }
        })

        .state("facilities.facility_edit.approve", {
            url: "approve/:update_id",
            views: {
                "tab-header@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.tabheaders.tpl.html"
                },
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        });
    }]);

})(angular);
