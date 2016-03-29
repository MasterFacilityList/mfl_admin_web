(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.list", [
        "ui.router"
    ])
    .constant("URL_SEARCH_PARAMS", [
        "name", "code",

        "search","sub_county",

        "county", "constituency", "ward",

        "operation_status", "facility_type", "keph_level",

        "open_public_holidays", "open_weekends", "open_whole_day",
        "open_normal_day",

        // pagination controls
        "page_size", "page"
    ])
    .config(["$stateProvider", "URL_SEARCH_PARAMS", function ($stateProvider, URL_SEARCH_PARAMS) {
        $stateProvider
        .state("facilities", {
            parent: "facility_mgmt",
            url: "^/facility_list/?"+URL_SEARCH_PARAMS.join("&"),
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.grid.tpl.html",
                    controller: "mfl.reports.controllers.facilities"
                }
            },
            permission: "facilities.view_facility"
        })
        .state("facility_approve_list", {
            parent: "facility_mgmt",
            url: "^/facility_approve_list/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_approved.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve_list"
                }
            },
            permission: "facilities.view_facility"
        })
        .state("facility_reject_list", {
            "parent": "facility_mgmt",
            "url": "^/facility_reject_list/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.rejected.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_rejected"
                }
            },
            permission: "facilities.view_facility"
        })

        .state("facilities_regulator_sync", {
            "parent": "facility_mgmt",
            "url": "^/facilities_regulator_sync/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/regulator_sync.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.regulator_sync"
                }
            },
            permission: "facilities.view_facility"
        })

        .state("facilities_feedback", {
            "parent": "facility_mgmt",
            "url": "^/facilities_feedback/?facility_id",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities_feedback.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_feedback"
                }
            },
            permission: "facilities.view_facilityservicerating"
        });
    }]);

})(window.angular);
