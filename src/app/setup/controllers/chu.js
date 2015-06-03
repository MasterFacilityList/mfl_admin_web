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
                    name: "Manage CHU Status"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.chu_status.create'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add new CHU status",
                    icon: "fa-plus"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.chuStatus.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            $scope.title = [
                {
                    icon: "fa-plus-circle",
                    name: "New CHU Status"
                }
            ];
            if(!_.isUndefined($stateParams.id)){
                adminApi.chuStatus.get($stateParams.id).success(function(data){
                    $scope.chuStatus = data;
                }).error(function(error){
                    $scope.alert = error.error;
                });
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
            $scope.deleteChuStatus = function(id){
                adminApi.chuStatus.remove(id).success(function(){
                    $state.go("setup.chu_status");
                }).error(function(error){
                    $scope.alert = error.error;
                });
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
                    icon: "fa-phone",
                    name: "Manage CHU Approvers"
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
        }]
    )
    .controller("mfl.setup.controller.chuApprover.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage CHU Approvals"
                }
            ];
            if(!_.isUndefined($stateParams.id)){
                adminApi.chuApprovers.get($stateParams.id).success(function(data){
                    $scope.chuApprovers = data;
                    $scope.edit = true;
                }).error(function(error){
                    $scope.alert = error.error;
                });
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
            $scope.deleteChuApprovers = function(id){
                adminApi.chuApprovers.remove(id).success(function(){
                    $state.go("setup.chu_approvers");
                }).error(function(error){
                    $scope.alert = error.error;
                });
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
