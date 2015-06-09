(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.home", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.home.list", ["$scope", function($scope){
        console.log("at home controller");
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
                tipmsg: "New User",
                icon: "fa-user-plus"
            }
        ];
    }])

    .controller("mfl.facilities.controllers.home.detail", ["$scope",
    "$stateParams",
    "mfl.facilities.wrappers", function($scope,$stateParams, facilityApi){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Facilities Details"
            }
        ];


        facilityApi.facilities.get($stateParams.facilityId)
        .success(function(data){
            $scope.facility = data;
        }).error(function(err){
            $scope.alert = err.error.error_msg;
        });
    }])
    ;
})(angular);
