(function (angular, _) {

    "use strict";

    angular.module("mfl.reports.controllers.chu_reporting", [
        "mfl.reports.services",
        "mfl.common.export"
    ])

    .controller("mfl.reports.controllers.chu_helper", ["mfl.reports.services.wrappers",
        "mfl.common.export.service",
        function(wrappers, exportService){
            this.initCtrl = function($scope, report_type, data_param, transform_fxn){
                $scope.search = "";
                var api_filters = {
                    "report_type": report_type
                };
                $scope.spinner = true;
                _.extend(api_filters, $scope.filters);

                wrappers.chul_reporting.filter(api_filters)
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
                    exportService.excelExport(wrappers.chul_reporting, api_filters);
                };
            };
        }
    ])
    .controller("mfl.reports.controllers.chu_counties", ["$scope", "$controller",
        function($scope, $controller) {
            var helper = $controller("mfl.reports.controllers.chu_helper");
            helper.initCtrl($scope, "county", "county_chu");
        }
    ])
    .controller("mfl.reports.controllers.chu_constituencies",
        ["$scope", "$controller", "$stateParams",
        function($scope, $controller, $stateParams){
            if ($stateParams.county) {
                $scope.filters = {
                    "county": $stateParams.county
                };
            }
            var helper = $controller("mfl.reports.controllers.chu_helper");
            helper.initCtrl($scope, "constituency", "constituency_chu");
        }
    ])
    .controller("mfl.reports.controllers.chu_wards", ["$scope", "$controller", "$stateParams",
        function($scope, $controller, $stateParams){
            if ($stateParams.constituency) {
                $scope.filters = {
                    "constituency": $stateParams.constituency
                };
            }
            var helper = $controller("mfl.reports.controllers.chu_helper");
            helper.initCtrl($scope, "ward", "ward_chu");
        }
    ])
    .controller("mfl.reports.controllers.chu_status", ["$scope", "$controller",
        function($scope, $controller){
            var helper = $controller("mfl.reports.controllers.chu_helper");
            helper.initCtrl($scope, "status", "chu_status");
        }
    ]);
})(window.angular, window._);
