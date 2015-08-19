(function (angular) {

    "use strict";

    angular.module("mfl.reports.controllers.facility_reporting", [
        "mfl.reports.services"
    ])

    .controller("mfl.reports.controllers.helper", ["mfl.reports.services.wrappers",
        function(wrappers){
            this.initCtrl = function($scope, report_type, data_param){
                $scope.search = "";
                $scope.filters = {
                    "report_type":report_type
                };
                wrappers.reporting.filter($scope.filters)
                .success(function (data) {
                    $scope[data_param] = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            };
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
                            "keph_facilities");
        }
    ])
    .controller("mfl.reports.controllers.county_facility_types", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_count_by_facility_type_detailed",
                            "county_types_facilities");
        }
    ])
    .controller("mfl.reports.controllers.county_constituencies", ["$scope",
        "$controller",
        function($scope,$controller){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, "facility_constituency_report",
                            "county_constituencies_facilities");
        }
    ]);
})(window.angular);
