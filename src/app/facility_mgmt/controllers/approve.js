(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.approve", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facility_approve",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.facility_mgmt.services.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.update_id = $stateParams.update_id;
            $scope.title = {
                "name": "Approve Facility Updates"
            };
            wrappers.facility_updates.get($scope.update_id)
            .success(function (data) {
                $scope.facility_update = data;
                $scope.facility_update.facility_updates = JSON.parse(
                    $scope.facility_update.facility_updates
                );
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.approve = function () {
                wrappers.facility_updates.update($scope.update_id, {"approved": true})
                .success(function () {
                    $state.go("facilities");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    );

})(angular);
