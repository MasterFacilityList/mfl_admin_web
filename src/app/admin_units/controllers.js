"use strict";

angular.module("mfl.admin_units.controllers",[
    "mfl.counties.wrapper",
    "mfl.constituencies.wrapper",
    "mfl.wards.wrapper"
])

    .controller("mfl.admin_units.controllers.admin_units", ["$scope",
    function ($scope) {
        $scope.test = "Administrative areas";
        $scope.path = [
            {
                name: "Administrative Units",
                route: "admin_units"
            }
        ];
        $scope.title = [
            {
                icon: "fa-map-marker",
                name: "Adminstrative Units"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='admin_units.new_unit' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Adminsitrative Units",
                icon: "fa-plus"
            }
        ];
    }])
    .controller("mfl.admin_units.controllers.towns", ["$scope",
        function ($scope) {
            $scope.test = "View administrative area";
            $scope.path = [
                {
                    name: "Adminstrative area",
                    route: "admin_units"
                },
                {
                    name: "Towns",
                    route: "admin_unit.towns"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "View Towns"
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
