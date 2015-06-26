(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.approve", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.facility_edit.approve", {
            url: ":update_id/approve/",
            views: {
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            }
        })
        .state("facilities.facility_edit.approve.confirm", {
            url: "confirm/",
            views: {
                "confirm@facilities.facility_edit.approve": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.confirm.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve.confirm"
                }
            }
        });
    }]);

})(angular);
