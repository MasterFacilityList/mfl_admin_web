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
        serviceServices.getServices()
            .success(function (services) {
                $scope.services = services.results;
            })
            .error(function (e) {
                console.log(e);
            });

    }])
    .controller("mfl.services.controllers.new_service", ["$scope",
        "mfl.services.services.services", "$state",
        function ($scope, serviceService, $state) {
        $scope.test = "New service";
        $scope.service = {
            category : "Select service"
        };
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
        serviceService.getServiceCategories()
            .success(function (cat) {
                $scope.categories = cat.results;
            })
            .error(function (e) {
                console.log(e);
            });
        $scope.submitService = function (serv) {
            console.log(serv);
            serviceService.createService(serv)
                .success(function (result) {
                    console.log(result);
                    $state.go("services");
                })
                .error(function (e) {
                    console.log(e);
                });
        };
    }])
    .controller("mfl.services.controllers.edit_service", ["$scope",
        "$stateParams", "mfl.services.services.services",
        function ($scope, $stateParams, serviceService) {
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
        serviceService.getServiceCategories()
            .success(function (cat) {
                $scope.categories = cat.results;
            })
            .error(function (e) {
                console.log(e);
            });
        serviceService.getOneService($stateParams.service_id)
            .success(function (serv) {
                $scope.service = serv;
            })
            .error(function (e) {
                console.log(e);
            });
    }])
    .controller("mfl.services.controllers.view_service", ["$scope",
    "mfl.services.services.services", "$stateParams",
    function ($scope, serviceServices, $stateParams) {
        $scope.test = "View service";
        $scope.path = [
            {
                name: "Services",
                route: "services"
            },
            {
                name: "View Service",
                route: "services.view_service"
            }
        ];
        $scope.title = [
            {
                icon: "fa-eye",
                name: "View Service"
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
        serviceServices.getOneService($stateParams.service_id)
            .success(function (data) {
                $scope.oneService = data;
            })
            .error(function (e) {
                console.log(e);
            });
    }]);
