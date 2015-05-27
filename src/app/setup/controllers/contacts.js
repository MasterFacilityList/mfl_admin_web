"use strict";
(function(angular){
    angular.module("mfl.setup.contacts.controllers",[
    ])
    .controller("mfl.setup.controller.contacts.list", ["$scope",
        function ($scope) {
            $scope.test = "Contacts list";
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Contact Types"
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
    .controller("mfl.setup.controller.contacts.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            $scope.test = "Contacts view";
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Contacts"
                }
            ];
            adminApi.contacts.get($stateParams.id).success(function(data){
                $scope.contacts = data;
                $scope.edit = true;
            }).error(function(error){
                $scope.alert = error.error;
            });

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
    )

    .controller("mfl.setup.controller.contacts.create", ["$scope","$state", "$stateParams",
                "adminApi",
        function($scope, $state, $stateParams, adminApi){
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Create Contacts"
                }
            ];
            $scope.create = true;
            $scope.createContacts = function(chuApprover){
                adminApi.contacts.create(chuApprover).success(function(){
                    $state.go("setup.contacts");
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    );

})(angular);
