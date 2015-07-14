(function(angular, _){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.approve", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facilities_rejected",
        ["$scope", function ($scope) {
            $scope.filters = {
                "rejected": true
            };
            $scope.title = {
                "name": "Rejected Facilities",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facilities_approve",
        ["$scope", function ($scope) {
            $scope.filters = {
                "approved": false
            };
            $scope.title = {
                "name": "Facilities Pending Approval",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facilities_approve_update",
        ["$scope", function ($scope) {
            $scope.filters = {
                "has_edits": true
            };
            $scope.title = {
                "name": "Facility Updates Pending Approval",
                "icon": "fa-building"
            };
        }]
    )

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
                "comment": "",
                "is_cancelled": false
            };

            $scope.approveFacility = function (cancel) {
                $scope.facility_approval.is_cancelled = !!cancel;
                wrappers.facility_approvals.create($scope.facility_approval)
                .success(function () {
                    $state.go("facilities");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            $scope.approveUpdate = function (approved) {
                if (! update_id) {
                    return;
                }
                var payload = (approved) ? {"approved": true} : {"cancelled": true};
                wrappers.facility_updates.update(update_id, payload)
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
