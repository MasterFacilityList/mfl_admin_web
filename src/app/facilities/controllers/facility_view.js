(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.view", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.view.base", ["$scope",
        "$stateParams", "mfl.facilities.wrappers",
        "mfl.facilities.wrappers", function($scope, $stateParams, facilityApi){
            $scope.title = [
                {
                    icon: "fa-building",
                    name: "Facility Details"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='facilities' " +
                            "has-permission='users.add_mfluser' ",
                    class: "action-btn action-btn-info action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            facilityApi.facilities.get($stateParams.facilityId)
            .success(function(data){
                $scope.facility = data;
            }).error(function(error){
                $scope.alert = facilityApi.utils.getError(error);
            });
        }]
        );
})(angular);

