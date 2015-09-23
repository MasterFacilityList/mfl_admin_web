(function (angular, _) {

    "use strict";

    angular.module("mfl.reports.controllers.chu_reporting", [
        "mfl.reports.services",
        "mfl.common.export"
    ])

    .controller("mfl.reports.controllers.helper", [
        "mfl.common.export.service",
        function(exportService){
            this.initCtrl = function($scope, wrapper, report_type, data_param, transform_fxn){
                $scope.search = "";
                var api_filters = {
                    "report_type": report_type
                };
                $scope.spinner = true;
                _.extend(api_filters, $scope.filters);

                wrapper.filter(api_filters)
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
                    exportService.excelExport(wrapper, api_filters);
                };
            };
        }
    ])
    .controller("mfl.reports.controllers.chu_counties", ["$scope", "$controller",
        "mfl.reports.services.wrappers",
        function($scope, $controller,wrappers) {
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, wrappers.chul_reporting, "county", "county_chu");
        }
    ])
    .controller("mfl.reports.controllers.chu_constituencies",
        ["$scope", "$controller", "$stateParams","mfl.reports.services.wrappers",
        function($scope, $controller, $stateParams,wrappers){
            if ($stateParams.county) {
                $scope.filters = {
                    "county": $stateParams.county
                };
            }
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, wrappers.chul_reporting, "constituency", "constituency_chu");
        }
    ])
    .controller("mfl.reports.controllers.chu_wards", ["$scope", "$controller", "$stateParams",
        "mfl.reports.services.wrappers",
        function($scope, $controller, $stateParams,wrappers){
            if ($stateParams.constituency) {
                $scope.filters = {
                    "constituency": $stateParams.constituency
                };
            }
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, wrappers.chul_reporting, "ward", "ward_chu");
        }
    ])
    .controller("mfl.reports.controllers.chu_status", ["$scope", "$controller",
        "mfl.reports.services.wrappers",
        function($scope, $controller,wrappers){
            var helper = $controller("mfl.reports.controllers.helper");
            helper.initCtrl($scope, wrappers.chul_reporting, "status", "chu_status");
        }
    ]);
})(window.angular, window._);
