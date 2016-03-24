(function (angular, _) {

    "use strict";

    angular.module("mfl.reports.controllers.chu_reporting", [
        "mfl.reports.services",
        "mfl.common.export"
    ])

    .controller("mfl.reports.controllers.helper", [
        "mfl.common.export.service", "mfl.reports.services.wrappers",
        function(exportService, apiWrapper){

            var self = this;

            this.fetch_summaries = function($scope){
                apiWrapper.filters.filter({fields: "county,sub_county,ward"})
                .success(function(data){
                    $scope.counties = data.county;
                    $scope.sub_counties = data.sub_county;
                    $scope.wards = data.ward;
                })
                .error(function(data){
                    $scope.error = data;
                });
            };

            this.filterFxns = function($scope){

                var subFilter = function (a) {
                    return a.county === $scope.selected_values.county;
                };

                var constFilter = function (a) {
                    return a.county === $scope.selected_values.county;
                };

                var wardConstFilter = function (a) {
                    return a.constituency === $scope.selected_values.constituency;
                };

                var wardSubFilter = function (a) {
                    return a.sub_county === $scope.selected_values.sub_county;
                };

                return {
                    subFilter: subFilter,
                    constFilter: constFilter,
                    wardConstFilter: wardConstFilter,
                    wardSubFilter: wardSubFilter
                };
            };

            this.selected_values = function(){
                return {
                    county: {},
                    sub_county: {},
                    constituency: {},
                    ward: {}
                };
            };

            this.clear_report_filters = function($scope){
                $scope.selected_values.county = {};
                $scope.selected_values.sub_county = {};
                $scope.selected_values.ward = {};
                $scope.search = "";
            };

            this.update_report = function($scope, wrapper,api_filters, data_param, transform_fxn){
                var county = $scope.selected_values.county;
                var sub_county = $scope.selected_values.sub_county;
                var ward = $scope.selected_values.ward;
                $scope.filters = {};

                if(!_.isEmpty(county)){
                    $scope.filters.county = county;
                }
                if(!_.isEmpty(sub_county)){
                    $scope.filters.sub_county = sub_county;
                }
                if(!_.isEmpty(ward)){
                    $scope.filters.ward = ward;
                }
                _.extend(api_filters, $scope.filters);
                console.log(api_filters);
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
                return $scope[data_param];
            };

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

                self.fetch_summaries($scope);

                $scope.selected_values = self.selected_values();

                $scope.filterFxns = self.filterFxns($scope);

                $scope.clear_report_filters = function() {
                    self.clear_report_filters($scope);
                    $scope.update_report();
                };
                $scope.update_report = function() {
                    self.update_report(
                    $scope, wrapper, api_filters, data_param, transform_fxn);
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
    .controller("mfl.reports.controllers.chu_detail", ["$scope", "$controller",
        "mfl.reports.services.wrappers","$stateParams",
        function($scope, $controller,wrappers, $stateParams) {
            var helper = $controller("mfl.reports.controllers.helper");

            $scope.selected_values = helper.selected_values();
            $scope.filters = {
                status: $stateParams.status_id,
                chu_list: true
            };
            var county = $scope.selected_values.county;
            var sub_county = $scope.selected_values.sub_county;
            var ward = $scope.selected_values.ward;
            if(!_.isEmpty(county)){
                $scope.filters.county = county;
            }
            if(!_.isEmpty(sub_county)){
                $scope.filters.sub_county = sub_county;
            }
            if(!_.isEmpty(ward)){
                $scope.filters.ward = ward;
            }

            helper.initCtrl($scope, wrappers.chul_reporting, "status", "chu");
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
