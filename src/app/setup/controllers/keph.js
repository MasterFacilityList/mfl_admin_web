(function(angular){
    "use strict";
    angular.module("mfl.setup.keph.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.keph.list", ["$scope",
        function ($scope) {
            $scope.title = {
                name: "KEPH"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.kephs.keph_create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.add_kephlevel'",
                    class: "login-btn login-btn-primary",
                    tipmsg: "New KEPH Level",
                    wording: "New KEPH Level"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.keph.create",
        ["$scope", "$state", "$log", "adminApi", function ($scope, $state, $log, adminApi) {
            $scope.title = {
                icon: "fa-plus-circle",
                name: "New KEPH Level"
            };
            $scope.keph = {
                name: ""
            };

            $scope.save = function () {
                adminApi.kephs.create($scope.town)
                .success(function (data) {
                    $state.go("setup.kephs.keph_edit", {"keph_id": data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.setup.controller.keph.edit",
        ["$scope", "$stateParams", "$state", "$log", "adminApi",
        function ($scope, $stateParams, $state, $log, adminApi) {
            $scope.title = {
                icon: "fa-edit",
                name: "Edit KEPH Level"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.kephs.keph_edit.delete'" +
                           " requires-user-feature='is_staff,is_national'" +
                           " requires-permission='facilities.change_kephlevel'",
                    class: "action-btn action-btn-danger action-btn-md",
                    wording: "Delete"
                }
            ];
            $scope.keph= $stateParams.keph_id;

            adminApi.kephs.get($scope.town_id)
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
                    $state.go("setup.kephs",{},{reload:true});
                });
            };
            $scope.cancel = function () {
                $state.go("setup.kephs",{},{reload:true});
            };
            $scope.save = function () {
                adminApi.towns.update($scope.town_id, {"name": $scope.keph.name})
                .success(function () {
                    $state.go("setup.kephs");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    );

})(window.angular);
