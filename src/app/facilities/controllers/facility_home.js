(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.home", [
        "mfl.facilities.services"
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
