(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.approve", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.facility_edit.approve", {
            url: "approve/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            }
        })
        .state("facilities.facility_edit.approve.confirm", {
            url: "approve/confirm/",
            views: {
                "confirm@facilities.facility_edit.approve": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.confirm.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve.confirm"
                }
            }
        });
    }]);

})(angular);
