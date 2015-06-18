(function(angular){
    "use strict";
    angular.module("mfl.setup.chu.controllers",[
        "mfl.setup.api",
        "mfl.common.forms"
    ])
    .controller("mfl.setup.controller.chuStatus.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-tasks",
                    name: "Manage Community Units Status"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.chu_status.create'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add community unit status",
                    icon: "fa-plus"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.chuStatus.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            if(!_.isUndefined($stateParams.id) && $stateParams.id !== "create"){
                $scope.title = [
                    {
                        icon: "fa-edit",
                        name: "Edit Community Unit Status"
                    }
                ];
                $scope.action = [
                    {
                        func : "ui-sref="+
                        "'setup.chu_status.view.delete'",
                        class: "action-btn action-btn-danger action-btn-md",
                        color: "blue",
                        tipmsg: "Delete CHU Status",
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
                adminApi.chuStatus.get($stateParams.id).success(function(data){
                    $scope.chuStatus = data;
                    $scope.deleteText = $scope.chuStatus.name;
                }).error(function(error){
                    $scope.alert = error.error;
                });
                $scope.remove = function () {
                    adminApi.chuStatus.remove($stateParams.id).success(function(){
                        $state.go("setup.chu_status");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $state.go("setup.chu_status");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.chu_status.view");
                };
            }
            else if(!_.isUndefined($stateParams.id) && $stateParams.id === "create") {
                $scope.title = [
                    {
                        icon: "fa-plus-circle",
                        name: "New Community Unit Status"
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
            }

            $scope.updateChuStatus = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.chuStatus.update(id, changes).success(function(){
                        $state.go("setup.chu_status");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };

            $scope.createChuStatus = function(chuStatus){
                adminApi.chuStatus.create(chuStatus).success(function(){
                    $state.go("setup.chu_status");
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    )

    .controller("mfl.setup.controller.chuApprover.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-user-secret",
                    name: "Manage Community Unit Approvers"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.chu_approvers.create'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add Community Unit Approver",
                    icon: "fa-plus"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.chuApprover.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){

            if(!_.isUndefined($stateParams.id) &&
                $stateParams.id !== "create"){
                $scope.title = [
                    {
                        icon: "fa-edit",
                        name: "Edit Commmunity Unit Approver"
                    }
                ];
                $scope.action = [
                    {
                        func : "ui-sref="+
                        "'setup.chu_approvers.view.delete'",
                        class: "action-btn action-btn-danger action-btn-md",
                        color: "blue",
                        tipmsg: "Delete CHU Approver",
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
                adminApi.chuApprovers.get($stateParams.id).success(function(data){
                    $scope.chuApprovers = data;
                    $scope.deleteText = $scope.chuApprovers.name;
                    $scope.edit = true;
                }).error(function(error){
                    $scope.alert = error.error;
                });
                $scope.remove = function () {
                    adminApi.chuApprovers.remove($stateParams.id).success(function(){
                        $state.go("setup.chu_approvers");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $state.go("setup.chu_approvers");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.chu_approvers.view");
                };
            }
            else if(!_.isUndefined($stateParams.id) &&
                $stateParams.id === "create") {
                $scope.title = [
                    {
                        icon: "fa-plus-circle",
                        name: "New Commmunity Unit Approver"
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
            }

            $scope.updateChuApprovers = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.chuApprovers.update(id, changes).success(function(){
                        $state.go("setup.chu_approvers");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };

            $scope.createChuApprovers = function(chuApprover){
                adminApi.chuApprovers.create(chuApprover).success(function(){
                    $state.go("setup.chu_approvers");
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    );

})(angular);
