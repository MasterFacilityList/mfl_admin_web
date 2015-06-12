(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.home", [
        "mfl.facilities.services",
        "mfl.common.forms"
    ])
    .controller("mfl.facilities.controllers.home.list", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Manage Facilities"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.create.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-user-plus"
            }
        ];
    }])

    .controller("mfl.facilities.controllers.home.facility_type", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Manage Facility Type"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.create.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-user-plus"
            }
        ];
    }])

    .controller("mfl.facilities.controllers.home.facility_type.view", ["$scope","$state",
     "$stateParams","adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            var titles = {
                edit: [{
                        icon: "fa-edit",
                        name: "Edit Facility Type"
                    }],
                create:  [
                    {
                        icon: "fa-plus-circle",
                        name: "New Facility Type"
                    }
                ]
            };
            var actions = {
                defaults: [{
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }],
                create: [{

                }],
                edit:[
                    {
                        func : ""+
                        " mfl-delete api='adminApi' api-key='facility_type'"+
                        " resource-id='"+$stateParams.id+"' "+
                        "resource-name='Facility Type'"+
                        " on-success-url='facilities.facility_type'",
                        class: "action-btn action-btn-danger action-btn-md",
                        color: "blue",
                        tipmsg: "Delete Facility Type",
                        icon: "fa-trash"
                    }
                ]
            };
            adminApi.utils.setActions($scope, $stateParams,adminApi.facility_type, titles, actions);



            $scope.updateFacilityType = function(id, frm){
                adminApi.utils.update(
                    id, frm,
                    adminApi.facility_type,
                    $scope, $state, "facilities.facility_type"
                );
            };

            $scope.createFacilityType = function(facilityType){
                adminApi.utils.create(
                    facilityType,
                    adminApi.facility_type,
                    $scope, $state, "facilities.facility_type"
                );
            };
        }]
    )

    .controller("mfl.facilities.controllers.home.facility_status", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Manage Facility Status"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.create.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-user-plus"
            }
        ];
    }]);
})(angular);
