(function(angular,_){
    "use strict";
    angular.module("mfl.setup.keph.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.keph.list", ["$scope",
        function ($scope) {
            $scope.title = {
                name: "KEPH Levels"
            };
            $scope.filters =  {
                "fields": "id,name,description"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_kephs.keph_create'" +
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
                adminApi.kephs.create($scope.keph)
                .success(function () {
                    $state.go("setup.facility_kephs",{},{reload:true});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.setup.controller.keph.edit",
        ["$scope", "$stateParams", "$state", "$log", "adminApi","mfl.common.forms.changes",
        function ($scope, $stateParams, $state, $log, adminApi, formChanges) {
            $scope.title = {
                icon: "fa-edit",
                name: "Edit KEPH Level"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_kephs.keph_edit.delete'" +
                           " requires-user-feature='is_staff,is_national'" +
                           " requires-permission='facilities.delete_kephlevel'",
                    class: "login-btn login-btn-danger",
                    tipmsg: "Delete KEPH level",
                    wording: "Delete"
                }
            ];
            $scope.keph_id = $stateParams.keph_id;
            $scope.wrapper = adminApi.kephs;

            adminApi.kephs.get($scope.keph_id)
            .success(function (data) {
                $scope.keph = data;
                $scope.deleteText = $scope.keph.name;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.remove = function () {
                adminApi.kephs.remove($stateParams.keph_id).success(function(){
                    $state.go("setup.facility_kephs");
                }).error(function(error){
                    $scope.alert = error.error;
                    $state.go("setup.facility_kephs");
                });
            };
            $scope.cancel = function () {
                $state.go("setup.facility_kephs");
            };
            $scope.save = function (id, frm) {
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.kephs.update(id, changes).success(function(){
                        $state.go("setup.facility_kephs");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };
        }]
    );

})(window.angular,window._);
