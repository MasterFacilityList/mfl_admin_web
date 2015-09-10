(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.upgrade_downgrade", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.facility_edit.upgrade", {
            url: "upgrade/",
            views: {
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_upgrade_downgrade.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_upgrade"
                }
            },
            permission: "facilities.add_facilitytype,facilities.view_facility"
        })
        .state("facilities.facility_edit.downgrade", {
            url: "downgrade/",
            views: {
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_upgrade_downgrade.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_downgrade"
                }
            },
            permission: "facilities.add_facilitytype,facilities.view_facility"
        });
    }]);

})(window.angular);
