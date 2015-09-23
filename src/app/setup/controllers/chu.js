(function(angular, _){
    "use strict";
    angular.module("mfl.setup.chu.controllers",[
        "mfl.setup.api",
        "mfl.common.forms",
        "angular-toasty"
    ])
    .controller("mfl.setup.controller.chuStatus.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-tasks",
                name: "Manage Community Units Status"
            };

            $scope.filters =  {
                "fields": "id,name,description"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.chu_status.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='chul.add_status'",
                    class: "btn btn-primary",
                    tipmsg: "Add community unit status",
                    wording: "Add CU Status"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.chuStatus.view", ["$scope","$state",
        "$stateParams", "adminApi","mfl.common.forms.changes", "toasty",
        function($scope, $state, $stateParams, adminApi, formChanges, toasty){
            if(!_.isUndefined($stateParams.id) && $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Community Unit Status"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.chu_status.view.delete'" +
                               " requires-user-feature='is_staff'" +
                               " requires-permission='chul.delete_status'",
                        class: "btn btn-danger",
                        wording: "Delete",
                        tipmsg: "Delete CHU Status"
                    }
                ];
                $scope.status_id = $stateParams.id;
                $scope.wrapper = adminApi.chuStatus;
                adminApi.chuStatus.get($stateParams.id).success(function(data){
                    $scope.chuStatus = data;
                    $scope.deleteText = $scope.chuStatus.name;
                }).error(function(error){
                    $scope.erros = error;
                });
                $scope.remove = function () {
                    adminApi.chuStatus.remove($stateParams.id).success(function(){
                        toasty.success({
                            title: "CHUL Status Deleted",
                            msg: "CHUL Status has been deleted"
                        });
                        $state.go("setup.chu_status");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $state.go("setup.chu_status");
                        $scope.errors = error;
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.chu_status.view");
                };
            }
            else if(!_.isUndefined($stateParams.id) && $stateParams.id === "create") {
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Community Unit Status"
                };
            }

            $scope.updateChuStatus = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.chuStatus.update(id, changes).success(function(){
                        toasty.success({
                            title: "CHUL Status Updates",
                            msg: "CHUL Status has been updated"
                        });
                        $state.go("setup.chu_status");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }
            };

            $scope.createChuStatus = function(chuStatus){
                adminApi.chuStatus.create(chuStatus).success(function(){
                    toasty.success({
                        title: "CHUL Status Added",
                        msg: "CHUL Status has been added"
                    });
                    $state.go("setup.chu_status");
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
            };
        }]
    )

    .controller("mfl.setup.controller.chuService.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-exchange",
                name: "Manage Community Units Service"
            };

            $scope.filters =  {
                "fields": "id,name,description"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.chu_service.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='chul.add_chuservice'",
                    class: "btn btn-primary",
                    tipmsg: "Add community unit service",
                    wording: "Add CU Service"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.chuService.view", ["$scope",
        "$stateParams", "adminApi", "$state", "toasty",
        function ($scope, $stateParams, adminApi, $state, toasty) {
            if(!_.isEmpty($stateParams.id) && !_.isNull($stateParams.id)) {
                $scope.create = false;
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Community Unit Service"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.chu_service.view.delete'" +
                               "ng-if='!create'"+
                               " requires-user-feature='is_staff'" +
                               " requires-permission='chul.delete_chuservice'",
                        class: "btn btn-danger",
                        wording: "Delete",
                        tipmsg: "Delete CHU Service"
                    }
                ];
                $scope.service_id = $stateParams.id;
                $scope.wrapper = adminApi.chuService;
                adminApi.chuService.get($stateParams.id)
                .success(function (data){
                    $scope.chuService = data;
                    $scope.deleteText = $scope.chuService.name;
                }).error(function (data){
                    $scope.erros = data;
                });
            }else{
                $scope.create = true;
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Community Unit Status"
                };
            }
            $scope.remove = function () {
                adminApi.chuService.remove($stateParams.id)
                .success(function(){
                    toasty.success({
                        title: "CHUL Service Deleted",
                        msg: "CHUL Service deleted successfully"
                    });
                    $state.go("setup.chu_service");
                }).error(function(error){
                    $scope.errors = error;
                });
            };
        }]
    );

})(window.angular, window._);
