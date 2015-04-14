"use strict";

angular.module("mfl.services.controllers", [])

    .controller("mfl.services.controllers.services", ["$scope",  "mfl.services.services.services",
    function ($scope, serviceServices) {
        $scope.test = "Services";
        $scope.path = [
            {
                name: "Services",
                route: "services"
            }
        ];
        $scope.title = [
            {
                icon: "fa-exchange",
                name: "Services"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='services.new_service' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Service",
                icon: "fa-plus"
            }
        ];
        $scope.services = serviceServices.getServices();
    }])
    .controller("mfl.services.controllers.new_service", ["$scope", function ($scope) {
        $scope.test = "New service";
        $scope.path = [
            {
                name: "Services",
                route: "services"
            },
            {
                name: "New Service",
                route: "services.new_service"
            }
        ];
        $scope.title = [
            {
                icon: "fa-plus-circle",
                name: "New Service"
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
    .controller("mfl.services.controllers.edit_service", ["$scope", function ($scope) {
        $scope.test = "Edit service";
        $scope.path = [
            {
                name: "Services",
                route: "services"
            },
            {
                name: "Edit Service",
                route: "services.edit_service"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit Service"
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
