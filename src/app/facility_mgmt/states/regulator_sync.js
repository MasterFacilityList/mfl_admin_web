(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.regulator_sync", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities_regulator_sync.update", {
            url: ":sync_id/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/regulator_sync.update.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.regulator_sync.update"
                }
            }
        });
    }]);

})(window.angular);
