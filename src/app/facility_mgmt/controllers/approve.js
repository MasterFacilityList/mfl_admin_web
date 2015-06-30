(function(angular, _){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.approve", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facility_approve",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.facility_mgmt.services.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            var update_id = $stateParams.update_id;
            if (update_id) {
                wrappers.facility_updates.get(update_id)
                .success(function (data) {
                    $scope.facility_update = data;
                    $scope.facility_update.facility_updates = JSON.parse(
                        $scope.facility_update.facility_updates
                    );
                    $scope.facility_changes = _.keys(data.facility_updates);
                })
                .error(function (data) {
                    $log.error(data);
                });
            }

            $scope.facility_approval = {
                "facility": $scope.facility_id,
                "comment": ""
            };

            $scope.approveFacility = function () {
                wrappers.facility_approvals.create($scope.facility_approval)
                .success(function () {
                    $state.go("facilities");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            $scope.approveUpdate = function () {
                if (! update_id) {
                    return;
                }
                wrappers.facility_updates.update(update_id, {"approved": true})
                .success(function () {
                    $state.go("facilities");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    );

})(angular, _);
