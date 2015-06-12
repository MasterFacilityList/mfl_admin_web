(function(angular){
    "use strict";
    angular.module("mfl.setup.town.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.town.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "Towns"
                }
            ];

            $scope.action = [
                {
                    func : "ui-sref='setup.towns.town_create' ",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "New Town",
                    icon: "fa-plus"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.town.create",
        ["$scope", "$state", "$log", "adminApi", function ($scope, $state, $log, adminApi) {
            $scope.title = [
                {
                    icon: "fa-plus-circle",
                    name: "New Town"
                }
            ];
            $scope.action = [
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            $scope.town = {
                name: ""
            };

            $scope.save = function () {
                adminApi.towns.create($scope.town)
                .success(function (data) {
                    $state.go("setup.town_edit", {"town_id": data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.setup.controller.town.edit",
        ["$scope", "$stateParams", "$state", "$log", "adminApi",
        function ($scope, $stateParams, $state, $log, adminApi) {
            $scope.title = [
                {
                    icon: "fa-edit",
                    name: "Edit Town"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.towns.town_delete({town_id:town.id})'",
                    class: "action-btn action-btn-danger action-btn-md",
                    color: "blue",
                    tipmsg: "Delete Town",
                    icon: "fa-trash"
                },
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            $scope.town_id = $stateParams.town_id;

            adminApi.towns.get($scope.town_id)
            .success(function (data) {
                $scope.town = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.save = function () {
                adminApi.towns.update($scope.town_id, {"name": $scope.town.name})
                .success(function () {
                    $state.go("setup.towns");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.setup.controller.town.delete",
        ["$scope", "$stateParams", "$state", "$log", "adminApi",
        function ($scope, $stateParams, $state, $log, adminApi) {
            $scope.town_id = $stateParams.town_id;

            adminApi.towns.get($scope.town_id)
            .success(function (data) {
                $scope.town = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.remove = function () {
                adminApi.towns.remove($scope.town_id)
                .success(function () {
                    $state.go("setup.towns");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )
    ;
})(angular);
