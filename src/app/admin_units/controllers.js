"use strict";

angular.module("mfl.admin_units.controllers", [])

    .controller("mfl.admin_units.controllers.admin_units", ["$scope",
    "mfl.admin_units.service.admin_units",
    function ($scope, unitService) {
        $scope.test = "Administrative areas";
        $scope.path = [
            {
                name: "Administrative areas",
                route: "admin_units"
            }
        ];
        $scope.title = [
            {
                icon: "fa-map-marker",
                name: "Adminstrative areas"
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
        $scope.admin_units = unitService.getAdminUnits();
    }])
    .controller("mfl.admin_units.controllers.new_unit", ["$scope",
    function ($scope) {
        $scope.test = "New Admin-area";
        $scope.path = [
            {
                name: "Adminstrative area",
                route: "admin_units"
            },
            {
                name: "New adminstrative area",
                route: "admin_unit.new_unit"
            }
        ];
        $scope.title = [
            {
                icon: "fa-plus-circle",
                name: "New Administrative area"
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
    .controller("mfl.admin_units.controllers.edit_unit", ["$scope",
    function ($scope) {
        $scope.test = "Edit administrative area";
        $scope.path = [
            {
                name: "Adminstrative area",
                route: "admin_units"
            },
            {
                name: "Edit adminstrative area",
                route: "admin_unit.edit_unit"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit Administrative area"
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
    .controller("mfl.admin_units.controllers.view_unit", ["$scope",
    "mfl.admin_units.service.admin_units", "$stateParams",
    function ($scope, unitService, $stateParams) {
        $scope.test = "View administrative area";
        $scope.path = [
            {
                name: "Adminstrative area",
                route: "admin_units"
            },
            {
                name: "View adminstrative area",
                route: "admin_unit.view_unit"
            }
        ];
        $scope.title = [
            {
                icon: "fa-eye",
                name: "View Administrative area"
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
        $scope.admin_units = unitService.getAdminUnits();
        $scope.getOneUnit = function() {
            $scope.oneUnit = _.findWhere(
                $scope.admin_units.results, {"id": $stateParams.unit_id});
            return $scope.oneUnit;
        };
    }]);
