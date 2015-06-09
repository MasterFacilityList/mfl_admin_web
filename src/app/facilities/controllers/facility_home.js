(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.home", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.home.list", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Manage Facitilites"
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
                name: "Facitilites Details"
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
