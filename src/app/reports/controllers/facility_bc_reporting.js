(function (angular, _) {

    "use strict";

    var results_transform = function (results, $scope) {
        var data = _.groupBy(results, function (a) {return a.county;});
        $scope.counties = _.keys(data);
        return _.map($scope.counties, function (c) {
            return {
                "county": c,
                "facilities": data[c]
            };
        });
    };

    angular.module("mfl.reports.controllers.facility_reporting", [
        "mfl.reports.services",
        "mfl.common.export",
        "mfl.common.filters",
        "mfl.reports.controllers.chu_reporting"
    ])

    .controller("mfl.reports.controllers.bc_counties", ["$scope", "$controller",
        "mfl.reports.services.wrappers",
        function($scope, $controller,wrappers) {
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "beds_and_cots_by_county", "county_bc");
        }
    ])
    .controller("mfl.reports.controllers.facility_counties_bed_cots", ["$scope",
        "mfl.reports.services.wrappers", "$stateParams", "$controller",
        function($scope, $wrappers, $stateParams, $controller){
            $scope.filters  = {
                "report_level": "county",
                "report_type": "individual_facility_beds_and_cots",
                "county": $stateParams.county_id
            };
            $scope.admin_area =  $stateParams.area_name + " "+ $stateParams.area_class;
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, $wrappers.reporting,
               "individual_facility_beds_and_cots", "data"
            );
        }
    ])
    .controller("mfl.reports.controllers.facilities_count_subs", ["$scope",
        "mfl.reports.services.wrappers", "$stateParams", "$controller",
        function($scope, $wrappers, $stateParams, $controller){
            $scope.filters  = {
                "report_level": "county",
                "report_type": "facility_count_by_county",
                "county": $stateParams.county_id
            };

            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, $wrappers.reporting,
               "facility_count_by_county", "county_facilities"
            );
        }
    ])
    .controller("mfl.reports.controllers.facilities_count_wards", ["$scope",
        "mfl.reports.services.wrappers", "$stateParams", "$controller",
        function($scope, $wrappers, $stateParams, $controller){
            $scope.filters  = {
                "report_level": "county",
                "report_type": "facility_count_by_county",
                "sub_county": $stateParams.sub_county_id
            };

            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, $wrappers.reporting,
               "facility_count_by_county", "county_facilities"
            );
        }
    ])
    .controller("mfl.reports.controllers.facility_cons_bed_cots", ["$scope",
        "mfl.reports.services.wrappers", "$stateParams", "$controller",
        function($scope, $wrappers, $stateParams, $controller){
            $scope.filters  = {
                "report_level": "county",
                "report_type": "individual_facility_beds_and_cots",
                "sub_county": $stateParams.sub_id
            };
            $scope.admin_area =  $stateParams.area_name + " "+ $stateParams.area_class;
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, $wrappers.reporting,
               "individual_facility_beds_and_cots", "data"
            );
        }
    ])
    .controller("mfl.reports.controllers.facility_wards_bed_cots", ["$scope",
        "mfl.reports.services.wrappers", "$stateParams", "$controller",
        function($scope, $wrappers, $stateParams, $controller){
            $scope.filters  = {
                "report_level": "county",
                "report_type": "individual_facility_beds_and_cots",
                "ward": $stateParams.ward_id
            };
            $scope.admin_area =  $stateParams.area_name + " "+ $stateParams.area_class;
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, $wrappers.reporting,
               "individual_facility_beds_and_cots", "data"
            );
        }
    ])
    .controller("mfl.reports.controllers.bc_constituencies",
        ["$scope", "$controller", "$stateParams",
        "mfl.reports.services.wrappers",
        function($scope, $controller, $stateParams,wrappers){
            if ($stateParams.county) {
                $scope.filters = {
                    "county": $stateParams.county
                };
            }
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "beds_and_cots_by_constituency",
                            "constituency_bc");
        }
    ])
    .controller("mfl.reports.controllers.bc_wards", ["$scope", "$controller", "$stateParams",
        "mfl.reports.services.wrappers",
        function($scope, $controller, $stateParams,wrappers){
            if ($stateParams.constituency) {
                $scope.filters = {
                    "constituency": $stateParams.constituency
                };
            }
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "beds_and_cots_by_ward", "ward_bc");
        }
    ])
    .controller("mfl.reports.controllers.facility_counties", ["$scope", "$controller",
        "mfl.reports.services.wrappers",
        function($scope, $controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_count_by_county",
                            "county_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_constituencies", ["$scope",
        "$controller","mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_count_by_consituency",
                            "const_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_types", ["$scope","$controller",
        "mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_count_by_facility_type",
                            "type_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_owner_categories", ["$scope",
        "$controller","mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");

            helper.initCtrl($scope,wrappers.reporting, "facility_count_by_owner_category",
                "owner_cat_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_owners", ["$scope","$controller",
        "mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_count_by_owner",
                            "owner_facilities");
        }
    ])
    .controller("mfl.reports.controllers.keph_levels", ["$scope",
        "$controller","mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_keph_level_report",
                            "keph_facilities", results_transform);
        }
    ])
    .controller("mfl.reports.controllers.county_facility_types", ["$scope",
        "$controller","mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_count_by_facility_type_detailed",
                            "county_types_facilities", results_transform);
        }
    ])
    .controller("mfl.reports.controllers.county_constituencies", ["$scope",
        "$controller","mfl.reports.services.wrappers",
        function($scope,$controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope,wrappers.reporting, "facility_constituency_report",
                            "county_constituencies_facilities", results_transform);
        }
    ]);
})(window.angular, window._);
