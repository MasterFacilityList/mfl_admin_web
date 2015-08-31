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
        "mfl.common.export"
    ])

    .controller("mfl.reports.controllers.helper", ["mfl.reports.services.wrappers",
        "mfl.common.export.service",
        function(wrappers, exportService){
            this.initCtrl = function($scope, report_type, data_param, transform_fxn){
                $scope.search = "";
                var api_filters = {
                    "report_type": report_type
                };
                $scope.spinner = true;
                _.extend(api_filters, $scope.filters);

                wrappers.reporting.filter(api_filters)
                .success(function (data) {
                    var transform = transform_fxn || _.identity;
                    $scope[data_param] = transform(data.results, $scope);
                    $scope.spinner = false;
                })
                .error(function (err) {
                    $scope.errors = err;
                    $scope.spinner = false;
                });
                $scope.exportToExcel = function () {
                    exportService.excelExport(wrappers.reporting, api_filters);
                };
            };
        }
    ])
    .controller("mfl.reports.controllers.bc_counties", ["$scope", "$controller",
        function($scope, $controller) {
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "beds_and_cots_by_county", "county_bc");
        }
    ])
    .controller("mfl.reports.controllers.bc_constituencies",
        ["$scope", "$controller", "$stateParams",
        function($scope, $controller, $stateParams){
            if ($stateParams.county) {
                $scope.filters = {
                    "county": $stateParams.county
                };
            }
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "beds_and_cots_by_constituency", "constituency_bc");
        }
    ])
    .controller("mfl.reports.controllers.bc_wards", ["$scope", "$controller", "$stateParams",
        function($scope, $controller, $stateParams){
            if ($stateParams.constituency) {
                $scope.filters = {
                    "constituency": $stateParams.constituency
                };
            }
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "beds_and_cots_by_ward", "ward_bc");
        }
    ])
    .controller("mfl.reports.controllers.facility_counties", ["$scope", "$controller",
        function($scope, $controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_county", "county_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_constituencies", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_consituency",
                            "const_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_types", ["$scope","$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_facility_type",
                            "type_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_owner_categories", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_owner_category",
                            "owner_cat_facilities");
        }
    ])
    .controller("mfl.reports.controllers.facility_owners", ["$scope","$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_owner",
                            "owner_facilities");
        }
    ])
    .controller("mfl.reports.controllers.keph_levels", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_keph_level_report",
                            "keph_facilities", results_transform);
        }
    ])
    .controller("mfl.reports.controllers.county_facility_types", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_facility_type_detailed",
                            "county_types_facilities", results_transform);
        }
    ])
    .controller("mfl.reports.controllers.county_constituencies", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_constituency_report",
                            "county_constituencies_facilities", results_transform);
        }
    ]);
})(window.angular, window._);
