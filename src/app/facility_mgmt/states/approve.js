(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.approve", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
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
            permission: "facilities.add_facilityapproval"
        });
    }]);

})(angular);
