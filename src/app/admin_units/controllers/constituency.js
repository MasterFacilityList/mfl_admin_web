"use strict";

angular.module("mfl.admin_units.constituency_controllers",[
    "mfl.counties.wrapper",
    "mfl.constituencies.wrapper",
    "mfl.wards.wrapper"
])

    .controller("mfl.admin_units.controllers.constituencies", ["$scope",
        function ($scope) {
            $scope.path = [
                {
                    name: "Adminstrative area",
                    route: "admin_units"
                },
                {
                    name: "Constituencies",
                    route: "admin_units.constituencies"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "View Constituencies"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
        }]
    )
    .controller("mfl.admin_units.controllers.constituencies.wards", ["$scope","constituenciesApi",
                "wardsApi","$stateParams",
        function ($scope, constituenciesApi, wardsApi, $stateParams) {
            console.log(wardsApi);
            constituenciesApi.api
                .get($stateParams.const_id)
                .success(function (data){
                    $scope.constituency_name = data.name;
                })
                .error(function(error){
                    console.log(error);
                });
            $scope.path = [
                {
                    name: "Adminstrative area",
                    route: "admin_units"
                },
                {
                    name: "Constituencies",
                    route: "admin_units.constituencies"
                },
                {
                    name: "Wards",
                    route: "admin_units.wards"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "{{constituency_name}}'s Wards"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
            $scope.filters = {constituency: $stateParams.const_id};
        }]
    );
