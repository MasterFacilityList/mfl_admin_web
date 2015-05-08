"use strict";

angular.module("mfl.setup.controllers",[
    "mfl.setup.counties.wrapper",
    "mfl.setup.constituencies.wrapper",
    "mfl.setup.wards.wrapper",
    "mfl.setup.county.controllers",
    "mfl.setup.constituency.controllers",
    "mfl.setup.ward.controllers",
    "mfl.setup.contacts.controllers",
    "mfl.setup.town.controllers"
])
    .controller("mfl.setup.controller.dashboard", ["$scope",
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
;
