(function(angular){
    "use strict";
    angular.module("mfl.setup.contacts.controllers",[
    ])
    
    /*Contacts*/
    
    .controller("mfl.setup.controller.contacts.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Contacts"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.contacts.create'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add Contact",
                    icon: "fa-plus"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.contacts.edit", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            adminApi.contact_types.list().success(function(data){
                $scope.contact_types = data.results;
            }).error(function(error){
                $scope.alert = error.error;
            });
            if(!_.isUndefined($stateParams.id)){
                $scope.title = [
                    {
                        icon: "fa-edit",
                        name: "Edit Contact"
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
                        tipmsg: "Delete Contact",
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
            else {
                $scope.title = [
                    {
                        icon : "fa-plus-circle",
                        name: "New Contact"
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
                    $state.go("setup.contacts",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
            $scope.updateContact = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.contacts.update(id, changes).success(function(){
                        $state.go("setup.contacts",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };
            $scope.deleteContacts = function(id){
                adminApi.contacts.remove(id).success(function(){
                    $state.go("setup.contacts",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    )
    /*Contact Types*/
    
    .controller("mfl.setup.controller.contact_types.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Contact Types"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.contact_types.create'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add Contact type",
                    icon: "fa-plus"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.contact_types.view", ["$scope","$state", "$stateParams",
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
                        " mfl-delete api='adminApi' api-key='contact_types'"+
                        " resource-id='"+$stateParams.id+"' "+
                        "resource-name='Contact'"+
                        " on-success-url='setup.contact_types'",
                        class: "action-btn action-btn-danger action-btn-md",
                        color: "blue",
                        tipmsg: "Delete Contact Type",
                        icon: "fa-trash"
                    },{
                        func : "popover-placement='bottom' " +
                        "popover-template='del_popover.templateUrl'"+
                        " tooltip-placement='top'",
                        class: "action-btn action-btn-danger action-btn-md",
                        tipmsg:"Delete",
                        color: "blue",
                        icon: "fa-trash"
                    },{
                        func : "onclick='window.history.back()'",
                        class: "action-btn action-btn-primary action-btn-md",
                        color: "blue",
                        tipmsg: "Go Back",
                        icon: "fa-arrow-left"
                    }
                ];
                $scope.del_popover = {
                    content: "Hello, World!",
                    templateUrl:"common/tpls/del_pop.tpl.html"
                };
                adminApi.contact_types.get($stateParams.id).success(function(data){
                    $scope.contact_types = data;
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
                adminApi.contact_types.create(chuApprover).success(function(){
                    $state.go("setup.contact_types",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
            $scope.updateContacts = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.contact_types.update(id, changes).success(function(){
                        $state.go("setup.contact_types",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };
            $scope.deleteContacts = function(id){
                adminApi.contact_types.remove(id).success(function(){
                    $state.go("setup.contact_types",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    );

})(angular);
