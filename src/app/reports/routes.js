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
        })
        .state("reports.counties", {
            url: "facility_counties",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.counties": {
                    templateUrl: "reports/tpls/facility_counties.tpl.html"
                }
            }
        })
        .state("reports.constituencies", {
            url: "facility_constituencies",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.constituencies": {
                    templateUrl: "reports/tpls/facility_constituencies.tpl.html"
                }
            }
        })
        .state("reports.facility_types", {
            url: "facility_types",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_types": {
                    templateUrl: "reports/tpls/facility_types.tpl.html"
                }
            }
        })
        .state("reports.facility_type_categories", {
            url: "facility_type_categories",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_type_categories": {
                    templateUrl: "reports/tpls/facility_type_categories.tpl.html"
                }
            }
        })
        .state("reports.facility_owners", {
            url: "facility_owners",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_owners": {
                    templateUrl: "reports/tpls/facility_owners.tpl.html"
                }
            }
        })
        .state("reports.facility_owner_categories", {
            url: "facility_owner_categories",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_owner_categories": {
                    templateUrl: "reports/tpls/facility_owner_categories.tpl.html"
                }
            }
        });

    }]);

})(window.angular);
