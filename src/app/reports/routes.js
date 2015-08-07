(function (angular) {

    "use strict";

    angular.module("mfl.reports.states", [
        "ui.router"
    ])
    .constant("URL_SEARCH_PARAMS", [
        "name", "code",

        "search",

        "county", "constituency", "ward",

        "operation_status", "facility_type", "keph_level",

        "owner_type", "owner",

        "service_category", "service",

        "number_of_beds", "number_of_cots",
        "open_public_holidays", "open_weekends", "open_whole_day",

        // pagination controls
        "page_size", "page"
    ])
    .config(["$stateProvider","URL_SEARCH_PARAMS", function ($stateProvider,
         URL_SEARCH_PARAMS) {
        $stateProvider
        .state("reports", {
            url: "/reports/",
            views: {
                "main": {
                    templateUrl: "common/tpls/main.tpl.html"
                },
                "body@reports" : {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "header@reports": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                }
            },
            redirectTo:"reports.list"
        })
        .state("reports.list", {
            url: "facilities?"+URL_SEARCH_PARAMS.join("&"),
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.list": {
                    templateUrl: "reports/tpls/facilities.grid.tpl.html",
                    controller: "mfl.reports.controllers.facilities"
                }
            }
        });

    }]);

})(window.angular);
