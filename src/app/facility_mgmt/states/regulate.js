(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.regulate", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("facilities_regulation", {
            "parent": "facility_mgmt",
            "url": "^/facilities_regulation/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_regulation"
                }
            },
            permission: "facilities.view_facility,facilities.add_facilityregulationstatus"
        })

        .state("facilities_regulation_approval", {
            "parent": "facility_mgmt",
            "url": "^/facilities_regulation_approval/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_regulation_approval"
                }
            },
            permission: "facilities.view_facility,facilities.add_facilityregulationstatus"
        })

        .state("facilities_regulation.regulate", {
            "url": ":facility_id/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_regulate.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_regulate"
                }
            },
            permission: "facilities.view_facility,facilities.add_facilityregulationstatus"
        });
    }]);

})(angular);
