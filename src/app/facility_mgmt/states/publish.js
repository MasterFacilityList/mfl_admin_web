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
            permission: "facilities.publish_facilities,facilities.view_facility"
        })

        .state("facilities_publish.publish.basic", {
            url: "basic/",
            views: {
                "form-view@facilities_publish.publish" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve.basic.tpl.html"
                }
            },
            permission: "facilities.publish_facilities,facilities.view_facility"
        })

        .state("facilities_publish.publish.services", {
            url: "services/",
            views: {
                "form-view@facilities_publish.publish" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve.services.tpl.html"
                }
            },
            permission: "facilities.publish_facilities,facilities.view_facility"
        })

        .state("facilities_publish.publish.units", {
            url: "units/",
            views: {
                "form-view@facilities_publish.publish" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve.units.tpl.html"
                }
            },
            permission: "facilities.publish_facilities,facilities.view_facility"
        });
    }]);

})(window.angular);
