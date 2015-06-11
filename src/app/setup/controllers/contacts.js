(function(angular){
    "use strict";
    angular.module("mfl.setup.contacts.controllers",[
    ])
    .controller("mfl.setup.controller.contacts.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Contact Types"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.contacts.create'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add Contact type",
                    icon: "fa-plus"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.contacts.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){

            if(!_.isUndefined($stateParams.id) &&
                $stateParams.id !== "create"){
                $scope.title = [
                    {
                        icon: "fa-edit",
                        name: "Edit Contact Type"
                    }
                ];
                $scope.action = [
                    {
                        func : ""+
                        " mfl-delete api='adminApi' api-key='contacts'"+
                        " resource-id='"+$stateParams.id+"' "+
                        "resource-name='Contact'"+
                        " on-success-url='setup.contacts'",
                        class: "action-btn action-btn-danger action-btn-md",
                        color: "blue",
                        tipmsg: "Delete Contact Type",
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
                adminApi.contacts.get($stateParams.id).success(function(data){
                    $scope.contacts = data;
                }).error(function(error){
                    $scope.alert = error.error;
                });
            }
            else if(!_.isUndefined($stateParams.id) &&
                $stateParams.id === "create") {
                $scope.title = [
                    {
                        icon : "fa-plus-circle",
                        name: "New Contact Type"
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
            $scope.createContacts = function(chuApprover){
                adminApi.contacts.create(chuApprover).success(function(){
                    $state.go("setup.contacts");
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
            $scope.updateContacts = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.contacts.update(id, changes).success(function(){
                        $state.go("setup.contacts");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };
            $scope.deleteContacts = function(id){
                adminApi.contacts.remove(id).success(function(){
                    $state.go("setup.contacts");
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    );

})(angular);
