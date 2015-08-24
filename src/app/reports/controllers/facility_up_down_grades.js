(function(angular,_){
    "use strict";
    angular.module("mfl.reports.updowngrades.controllers",[
        "mfl.reports.services",
        "mfl.common.export"
    ])

    .controller("mfl.reports.controller.updowngrade.list", ["$scope",
        "mfl.reports.services.wrappers", "mfl.common.export.service",
        function ($scope,reportsApi, exportService) {
            $scope.filters =  {
                "fields": "county,changes,county_id"
            };
            reportsApi.up_down_grades.list()
            .success(function (data) {
                $scope.changes = data;
            })
            .error(function (error) {
                $scope.errors = error;
            });
            $scope.search_changes = function (upgrades, recent) {
                $scope.filters = _.extend({"fields": "county,changes,county_id"},
                                          upgrades,recent);
                reportsApi.up_down_grades.filter($scope.filters)
                .success(function (data) {
                    $scope.changes = data;
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
                $scope.changes = data;
            })
            .error(function (error) {
                $scope.errors = error;
            });


        }]
    );

})(window.angular,window._);
