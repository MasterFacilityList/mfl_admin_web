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
                func : "ui-sref='facilities.new_facility.basic'",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-plus"
            },
            {
                func : "",
                class: "action-btn action-btn-md action-btn-warm ",
                color: "blue",
                tipmsg: "Publish Facilities",
                icon: "fa-tag"
            }
        ];

        $scope.facilities = facilityService.getFacilities();
    }])
    .controller("mfl.facilities.controllers.facilitiesaction", ["$scope", "$stateParams",
    "mfl.facilities.services.facilities", function ($scope, $stateParams,facilityService) {
        $scope.test = "Process Facilities";
        $scope.oneFacility = "";
        $scope.facilities = facilityService.getFacilities();
        $scope.results = $scope.facilities.results;
        $scope.getOnefacility = function () {
            $scope.oneFacility = _.findWhere($scope.results, {"id" : $stateParams.fac_id});
            return $scope.oneFacility;
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Process Facility",
                route: "facilities.facility_action"
            }
        ];
        $scope.title = [
            {
                icon: "fa-th",
                name: "Process Facility "
            }
        ];
        $scope.action = [
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-success ",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-check"
            },
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-danger ",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-close"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.facilities.controllers.new_facility", ["$scope", function ($scope) {
        $scope.test = "New facilities";
        $scope.setter = false;
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "New Facility",
                route: "facilities.new_facility.basic"
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
    }])
    .controller("mfl.facilities.controllers.edit_facility", ["$scope", "$stateParams",
    "mfl.facilities.services.facilities", function ($scope, $stateParams, facilityService) {
        $scope.test="Edit facility";
        $scope.setter = true;
        $scope.facilities = facilityService.getFacilities();
        $scope.facility = _.findWhere($scope.facilities, {id : $stateParams.fac_id});
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Edit Facility",
                route: "facilities.edit_facility.basic"
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
