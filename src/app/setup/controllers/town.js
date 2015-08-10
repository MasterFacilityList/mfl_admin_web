(function(angular){
    "use strict";
    angular.module("mfl.setup.town.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.town.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Towns"
            };
            $scope.filters = {
                "fields": "id,name,ward_name"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.towns.town_create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='common.add_town'",
                    class: "btn btn-primary",
                    tipmsg: "New Town",
                    wording: "New Town"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.town.create",
        ["$scope", "$state", "$log", "adminApi", function ($scope, $state, $log, adminApi) {
            $scope.title = {
                icon: "fa-plus-circle",
                name: "New Town"
            };
            $scope.town = {
                name: ""
            };

            $scope.save = function () {
                adminApi.towns.create($scope.town)
                .success(function (data) {
                    $state.go("setup.towns.town_edit", {"town_id": data.id});
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
            $scope.title = {
                icon: "fa-edit",
                name: "Edit Town"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.towns.town_edit.delete'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='common.change_town'",
                    class: "btn btn-danger",
                    tipmsg: "Delete Town",
                    wording: "Delete"
                }
            ];
            $scope.town_id = $stateParams.town_id;

            adminApi.towns.get($scope.town_id)
            .success(function (data) {
                $scope.town = data;
                $scope.deleteText = $scope.town.name;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.remove = function () {
                adminApi.towns.remove($stateParams.town_id).success(function(){
                    $state.go("setup.towns",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                    $state.go("setup.towns",{},{reload:true});
                });
            };
            $scope.cancel = function () {
                $state.go("setup.towns",{},{reload:true});
            };
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
    );

})(window.angular);
