(function (angular) {

    "use strict";

    angular.module("mfl.reports.states", [
        "ui.router"
    ])
    .constant("URL_SEARCH_PARAMS", [
        "name", "code", "sub_county",

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
                    templateUrl: "reports/tpls/facility_counties.tpl.html",
                    controller:"mfl.reports.controllers.facility_counties"
                }
            }
        })
        .state("reports.bed_cots_facilities", {
            url: "bed_cots_facilities_by_county/:county_id/:area_class/:area_name",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.bed_cots_facilities": {
                    templateUrl: "reports/tpls/facility_bed_cots_counties.tpl.html",
                    controller:"mfl.reports.controllers.facility_counties_bed_cots"
                }
            }
        })
        .state("reports.bed_cots_facilities_sub", {
            url: "bed_cots_facilities_by_sub_county/:sub_id/:area_class/:area_name",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.bed_cots_facilities_sub": {
                    templateUrl: "reports/tpls/facility_bed_cots_counties.tpl.html",
                    controller:"mfl.reports.controllers.facility_cons_bed_cots"
                }
            }
        })
        .state("reports.bed_cots_facilities_ward", {
            url: "bed_cots_facilities_by_ward/:ward_id/:area_class/:area_name",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.bed_cots_facilities_ward": {
                    templateUrl: "reports/tpls/facility_bed_cots_counties.tpl.html",
                    controller:"mfl.reports.controllers.facility_wards_bed_cots"
                }
            }
        })
        .state("reports.facilities_count_subs", {
            url: "facilities_count/:county_id/",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facilities_count_subs": {
                    templateUrl: "reports/tpls/facilities_count_subs.tpl.html",
                    controller:"mfl.reports.controllers.facilities_count_subs"
                }
            }
        })
        .state("reports.facilities_count_wards", {
            url: "facilities_count_wards/:sub_county_id/",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facilities_count_wards": {
                    templateUrl: "reports/tpls/facilities_count_wards.tpl.html",
                    controller:"mfl.reports.controllers.facilities_count_wards"
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
                    templateUrl: "reports/tpls/facility_constituencies.tpl.html",
                    controller:"mfl.reports.controllers.facility_constituencies"
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
                    templateUrl: "reports/tpls/facility_types.tpl.html",
                    controller:"mfl.reports.controllers.facility_types"
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
                    templateUrl: "reports/tpls/facility_type_categories.tpl.html",
                    controller:"mfl.reports.controllers.facility_type_categories"
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
                    templateUrl: "reports/tpls/facility_owners.tpl.html",
                    controller:"mfl.reports.controllers.facility_owners"
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
                    templateUrl: "reports/tpls/facility_owner_categories.tpl.html",
                    controller:"mfl.reports.controllers.facility_owner_categories"
                }
            }
        })
        .state("reports.facility_county_keph_levels", {
            url: "facility_keph_levels",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_county_keph_levels": {
                    templateUrl: "reports/tpls/facility_keph_levels.tpl.html",
                    controller:"mfl.reports.controllers.keph_levels"
                }
            }
        })
        .state("reports.facility_county_facility_types", {
            url: "facility_county_facility_types",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_county_facility_types": {
                    templateUrl: "reports/tpls/facility_counties_types.tpl.html",
                    controller:"mfl.reports.controllers.county_facility_types"
                }
            }
        })
        .state("reports.facility_county_constituencies", {
            url: "facility_county_constituencies",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_county_constituencies": {
                    templateUrl: "reports/tpls/facility_counties_constituencies.tpl.html",
                    controller:"mfl.reports.controllers.county_constituencies"
                }
            }
        })
        .state("reports.facility_county_changes", {
            url: "facility_county_changes",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_county_changes": {
                    templateUrl: "reports/tpls/facility_changes.tpl.html",
                    controller:"mfl.reports.controller.updowngrade.list"
                }
            }
        })
        .state("reports.facility_county_changes.view", {
            url: "/view/:county_id",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.facility_county_changes.view": {
                    templateUrl: "reports/tpls/facility_changes_view.tpl.html",
                    controller:"mfl.reports.controller.updowngrade.view"
                }
            }
        })
        .state("reports.bc_counties", {
            url: "beds_cots_counties",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.bc_counties": {
                    templateUrl: "reports/tpls/bc_counties.tpl.html",
                    controller:"mfl.reports.controllers.bc_counties"
                }
            }
        })
        .state("reports.bc_constituencies", {
            url: "beds_cots_constituencies?county",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.bc_constituencies": {
                    templateUrl: "reports/tpls/bc_constituencies.tpl.html",
                    controller:"mfl.reports.controllers.bc_constituencies"
                }
            }
        })
        .state("reports.bc_wards", {
            url: "beds_cots_wards?constituency",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html",
                    controller:"mfl.reports.controllers.main"
                },
                "main-content@reports.bc_wards": {
                    templateUrl: "reports/tpls/bc_wards.tpl.html",
                    controller:"mfl.reports.controllers.bc_wards"
                }
            }
        })
        .state("reports.chu_counties", {
            url: "chu_counties",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "main-content@reports.chu_counties": {
                    templateUrl: "reports/tpls/chu_counties.tpl.html",
                    controller:"mfl.reports.controllers.chu_counties"
                }
            }
        })
         .state("reports.chu_detail_status", {
            url: "chu_detail/:status_id",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "main-content@reports.chu_detail_status": {
                    templateUrl: "reports/tpls/chu_detail.tpl.html",
                    controller:"mfl.reports.controllers.chu_detail"
                }
            }
        })
        .state("reports.chu_constituencies", {
            url: "chu_constituencies?county",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "main-content@reports.chu_constituencies": {
                    templateUrl: "reports/tpls/chu_constituencies.tpl.html",
                    controller: "mfl.reports.controllers.chu_constituencies"
                }
            }
        })
        .state("reports.chu_wards", {
            url: "chu_wards?constituency",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "main-content@reports.chu_wards": {
                    templateUrl: "reports/tpls/chu_wards.tpl.html",
                    controller: "mfl.reports.controllers.chu_wards"
                }
            }
        })
        .state("reports.chu_status", {
            url: "chu_status",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "main-content@reports.chu_status": {
                    templateUrl: "reports/tpls/chu_status.tpl.html",
                    controller: "mfl.reports.controllers.chu_status"
                }
            }
        });

    }]);

})(window.angular);
