(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.view", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.view.base", ["$scope",
        "$stateParams", "mfl.facilities.wrappers",
        "mfl.facilities.wrappers", function($scope, $stateParams, facilityApi){
            facilityApi.facilities.get($stateParams.facilityId)
            .success(function(data){
                $scope.facility = data;
            }).error(function(error){
                $scope.alert = facilityApi.utils.getError(error);
            });
        }]
        );
})(angular);

