(function (angular) {

    "use strict";

    angular.module("mfl.reports.controllers.facility_reporting", [
        "mfl.reports.services"
    ])

    .controller("mfl.reports.controllers.facility_counties", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_count_by_county"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.county_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ])
    .controller("mfl.reports.controllers.facility_constituencies", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_count_by_consituency"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.const_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ])
    .controller("mfl.reports.controllers.facility_type_categories", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_count_by_facility_type"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.type_cat_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ])
    .controller("mfl.reports.controllers.facility_types", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_count_by_facility_type"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.type_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ])
    .controller("mfl.reports.controllers.facility_owner_categories", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_count_by_owner_category"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.owner_cat_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ])
    .controller("mfl.reports.controllers.facility_owners", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_count_by_owner"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.owner_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ])
    .controller("mfl.reports.controllers.keph_levels", ["$scope",
        "mfl.reports.services.wrappers",
        function($scope,wrappers){
            $scope.filters = {
                "report_type":"facility_keph_level_report"
            };
            wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope.keph_facilities = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
        }
    ]);
})(window.angular);
