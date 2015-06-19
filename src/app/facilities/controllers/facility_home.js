(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.home", [
        "mfl.facilities.services",
        "mfl.common.forms"
    ])
    .controller("mfl.facilities.controllers.home.base", ["$state", function($state){
        $state.go("facilities.list");
    }])
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
                icon: "fa-plus"
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
                func : "ui-sref='facilities.facility_type_create' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-plus"
            }
        ];
    }])

    .controller("mfl.facilities.controllers.home.facility_type.create", ["$scope","$state",
     "$stateParams","mfl.facilities.wrappers","mfl.common.forms.changes",
        function($scope, $state, $stateParams, facilityApi, formChanges){
            var titles = {
                edit: [
                    {
                        icon: "fa-edit",
                        name: "Edit Facility Type"
                    }
                ],
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
                        " mfl-delete api='mfl.facilities.wrappers' api-key='facility_type'"+
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
            facilityApi.utils.setActions(
                $scope, $stateParams,facilityApi.facility_type, titles,actions);
            $scope.updateFacilityType = function(id, frm){
                facilityApi.utils.update(
                    id, frm,
                    facilityApi.facility_type,
                    $scope, $state, "facilities.facility_type",
                    formChanges
                );
            };
            $scope.createFacilityType = function(facilityType){
                facilityApi.utils.create(
                    facilityType,
                    facilityApi.facility_type,
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
                func : "ui-sref='facilities.facility_status_create' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New Facility Status",
                icon: "fa-plus"
            }
        ];
    }])

    .controller("mfl.facilities.controllers.home.facility_status.create", ["$scope","$state",
     "$stateParams","mfl.facilities.wrappers","mfl.common.forms.changes",
        function($scope, $state, $stateParams, facilityApi, formChanges){
            var titles = {
                edit: [
                    {
                        icon: "fa-edit",
                        name: "Edit Facility Status"
                    }
                ],
                create:  [
                    {
                        icon: "fa-plus-circle",
                        name: "New Facility Status"
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
                        " mfl-delete api='mfl.facilities.wrappers' api-key='facility_status'"+
                        " resource-id='"+$stateParams.id+"' "+
                        "resource-name='Facility Status'"+
                        " on-success-url='facilities.facility_status'",
                        class: "action-btn action-btn-danger action-btn-md",
                        color: "blue",
                        tipmsg: "Delete Facility Status",
                        icon: "fa-trash"
                    }
                ]
            };
            facilityApi.utils.setActions(
                $scope, $stateParams,facilityApi.facility_status, titles,actions);
            $scope.updateFacilityStatus = function(id, frm){
                facilityApi.utils.update(
                    id, frm,
                    facilityApi.facility_status,
                    $scope, $state, "facilities.facility_status",
                    formChanges
                );
            };
            $scope.createFacilityStatus = function(facilityStatus){
                facilityApi.utils.create(
                    facilityStatus,
                    facilityApi.facility_status,
                    $scope, $state, "facilities.facility_status"
                );
            };
        }]
    );
})(angular);
