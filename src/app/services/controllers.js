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
    }]);
