(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.upgrade_downgrade", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.upgrade", {
            url: "upgrade/:facility_id/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_up_down_grade.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_upgrade"
                }
            },
            permission: "facilities.change_facility,"+
                        "facilities.add_facilityservice"
        })
        .state("facilities.downgrade", {
            url: "downgrade/:facility_id/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_up_down_grade.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_downgrade"
                }
            },
            permission: "facilities.add_facilitytype,facilities.view_facility"
        });
    }]);

})(window.angular);
