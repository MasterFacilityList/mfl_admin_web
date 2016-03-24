(function(angular,_){
    "use strict";
    angular.module("mfl.reports.updowngrades.controllers",[
        "mfl.reports.services",
        "mfl.common.export"
    ])

    .controller("mfl.reports.controller.updowngrade.list", ["$scope",
        "mfl.reports.services.wrappers", "mfl.common.export.service",
        "$controller",
        function ($scope,reportsApi, exportService, $controller) {
            $scope.filters =  {
                "fields": "county,changes,county_id"
            };
            $scope.spinner = true;
            reportsApi.up_down_grades.list()
            .success(function (data) {
                $scope.changes = data.results;
                $scope.area_class = "County";
                $scope.spinner = false;
            })
            .error(function (error) {
                $scope.errors = error;
                $scope.snipper = false;
            });

            var helper = $controller("mfl.reports.controllers.helper");
            helper.fetch_summaries($scope);
            $scope.selected_values = helper.selected_values();

            $scope.filterFxns = helper.filterFxns($scope);

            $scope.clear_report_filters = function() {
                helper.clear_report_filters($scope);
            };
            $scope.update_report = function() {
                helper.update_report(
                $scope, reportsApi.up_down_grades, {}, "changes");
                $scope.area_class = "Sub-county";
            };

            $scope.search_changes = function (upgrades, recent) {
                $scope.filters = _.extend({"fields": "county,changes,county_id"},
                                          upgrades,recent);
                reportsApi.up_down_grades.filter($scope.filters)
                .success(function (data) {
                    $scope.changes = data.results;
                    $scope.area_class = "County";
                })
                .error(function (error) {
                    $scope.errors = error;
                });
            };
            $scope.exportToExcel = function () {
                exportService.excelExport(reportsApi.up_down_grades, $scope.filters);
            };
        }]
    )
    .controller("mfl.reports.controller.updowngrade.view", ["$scope",
        "mfl.reports.services.wrappers","$stateParams",
        function ($scope,reportsApi,$stateParams) {
            reportsApi.up_down_grades.filter({"county":$stateParams.county_id})
            .success(function (data) {
                $scope.changes = data.results;
            })
            .error(function (error) {
                $scope.errors = error;
            });


        }]
    );

})(window.angular,window._);
