(function(angular, _){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.contacts.controllers
     *
     * @description
     * Contains all the controllers used for contacts setup
     */
    angular.module("mfl.setup.contacts.controllers",[
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.contact_types.list
     *
     * @description
     * The controller used to list the contact types
     */
    .controller("mfl.setup.controller.contact_types.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-phone",
                name: "Manage Contact Types"
            };
            $scope.filters = {
                "fields": "id,name"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.contact_types.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='common.add_contacttype'",
                    class: "btn btn-primary",
                    tipmsg: "Add Contact Type",
                    wording: "Add Contact Type"
                }
            ];
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.contact_types.view
     *
     * @description
     * The controller used to view a contact type
     */
    .controller("mfl.setup.controller.contact_types.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes","toasty",
        function($scope, $state, $stateParams, adminApi, formChanges,toasty){
            $scope.contact_type_id = $stateParams.id;
            $scope.wrapper = adminApi.contact_types;

            if(!_.isUndefined($stateParams.id)){
                $scope.title = {
                    class: "btn btn-primary",
                    name: "Edit Contact Type",
                    icon: "fa-edit"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.contact_types.view.delete'" +
                               " requires-user-feature='is_staff'" +
                               " requires-permission='common.delete_contacttype'",
                        class: "btn btn-danger",
                        wording:"Delete",
                        tipmsg:"Delete Contact Type"

                    }
                ];
                adminApi.contact_types.get($stateParams.id).success(function(data){
                    $scope.contact_types = data;
                    $scope.deleteText = $scope.contact_types.name;
                }).error(function(error){
                    $scope.alert = error.error;
                });
                $scope.remove = function () {
                    adminApi.contact_types.remove($stateParams.id).success(function(){
                        toasty.success({
                            title: "Contact Type Delete",
                            msg: "Contact type has been deleted successfully"
                        });
                        $state.go("setup.contact_types",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                        $state.go("setup.contact_types",{},{reload:true});
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.contact_types.view",{},{reload:true});
                };
            } else {
                $scope.title = {
                    icon : "fa-plus-circle",
                    name: "New Contact Type"
                };
            }
            $scope.createContacts = function(chuApprover){
                adminApi.contact_types.create(chuApprover).success(function(){
                    toasty.success({
                        title: "Contact type added",
                        msg: "Contact type has been added"
                    });
                    $state.go("setup.contact_types",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
            };
            $scope.updateContacts = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.contact_types.update(id, changes).success(function(){
                        toasty.success({
                            title: "Contact type updated",
                            msg: "Contact type has been updated"
                        });
                        $state.go("setup.contact_types",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }
            };
        }]
    );

})(window.angular, window._);
