"use strict";

angular.module("mfl.services.controllers", [])

    .controller("mfl.services.controllers.services", ["$scope",
    "mfl.services.services.services", function ($scope, serviceService) {
        $scope.test = "services";
        $scope.path = [
            {
                name: "services",
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
                tipmsg: "New Services",
                icon: "fa-plus"
            },
            {
                func : "",
                class: "action-btn action-btn-md action-btn-warm ",
                color: "blue",
                tipmsg: "Publish services",
                icon: "fa-tag"
            }
        ];

        $scope.services = serviceService.getServices();
    }]);