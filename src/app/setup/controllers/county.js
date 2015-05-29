"use strict";
(function(angular){
    angular.module("mfl.setup.county.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.county.list", ["$scope",
        function ($scope) {
            $scope.test = "View administrative area";
            $scope.path = [
                {
                    name: "Adminstrative area",
                    route: "admin_units"
                },
                {
                    name: "Counties",
                    route: "admin_unit.counties"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "View Counties"
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
    );

})(angular);
