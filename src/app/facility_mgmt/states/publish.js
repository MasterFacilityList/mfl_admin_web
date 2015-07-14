(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.publish", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("facilities_publish", {
            parent: "facility_mgmt",
            url: "^/facilities_publish/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_publish"
                }
            },
            userFeature: "is_national",
            permission: "facilities.publish_facilities,facilities.view_facility"
        })

        .state("facilities_publish.publish", {
            url: ":facility_id/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_publish.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_publish"
                }
            },
            userFeature: "is_national",
            permission: "facilities.publish_facilities,facilities.view_facility"
        });
    }]);

})(angular);
