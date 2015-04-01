"use strict";

angular.module("mfl.facilities.controllers", [])

    .controller("mfl.facilities.controllers.facilities", ["$scope", 
    "mfl.facilities.services.facilities", function ($scope, facilityService) {
        $scope.test = "Facilities";
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            }
        ];
        $scope.title = [
            {
                icon: "fa-building",
                name: "Facilities"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.new_facility'",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-plus"
            }
        ];

        $scope.facilities = facilityService.getFacilities();
    }])
    .controller("mfl.facilities.controllers.new_facility", ["$scope", function ($scope) {
        $scope.test = "New facilities";
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "New Facility",
                route: "facilities.new_facility"
            }
        ];
        $scope.title = [
            {
                icon: "fa-plus-circle",
                name: "New facility"
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
    }]);