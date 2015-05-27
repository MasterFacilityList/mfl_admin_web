"use strict";
(function(angular){
    angular.module("mfl.setup.constituency.controllers",[
        "mfl.setup.api"
    ])

    .controller("mfl.setup.controller.constituency.list", ["$scope",
        function ($scope) {
            $scope.test = "Constituency list";
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
    .controller("mfl.setup.controller.constituency.wards", ["$scope","adminApi",
                "$stateParams",
        function ($scope, adminApi, $stateParams) {
            adminApi.constituencies
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

})(angular);
