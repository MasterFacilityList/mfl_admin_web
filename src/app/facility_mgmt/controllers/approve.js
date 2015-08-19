(function(angular, _){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.approve", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facilities_closed",
        ["$scope", function ($scope) {
            $scope.filters = {
                "closed": true,
                "fields": "id,code,name,facility_type_name,owner_name,county,"+
                          "sub_county,constituency,ward_name,updated"
            };
            $scope.title = {
                "name": "Closed Facilities",
                "icon": "fa-building"
            };
        }]
    )
    .controller("mfl.facility_mgmt.controllers.facilities_rejected",
        ["$scope", function ($scope) {
            $scope.filters = {
                "rejected": true,
                "approved": true,
                "fields": "id,code,name,facility_type_name,owner_name,county,"+
                          "sub_county,constituency,ward_name,updated"
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
                "approved": false,
                "rejected": false
            };
            $scope.title = {
                "name": "Approve Facilities",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facilities_approve_update",
        ["$scope", function ($scope) {
            $scope.filters = {
                "has_edits": true,
                "rejected": false
            };
            $scope.title = {
                "name": "Approve Facility Updates",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_approve",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.facility_mgmt.services.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.facility_id = $stateParams.facility_id;
            wrappers.facility_units.filter({"facility" : $scope.facility_id})
            .success(function (data) {
                $scope.chus = data.results;
            })
            .error(function (e) {
                $scope.alert = e.error;
            });

            wrappers.facility_approvals.filter({"facility": $scope.facility_id})
            .success(function (data) {
                $scope.facility_approvals = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });

            wrappers.facility_services.filter({
                "facility": $scope.facility_id,
                "is_cancelled": false,
                "is_confirmed": false,
                "fields": "id,service_name,option_display_value"
            })
            .success(function (data) {
                $scope.facility_service_updates = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });

            wrappers.facility_detail.get($scope.facility_id)
            .success(function(data) {
                $scope.facility = data;
                if ($scope.facility.coordinates) {
                    wrappers.facility_coordinates.get($scope.facility.coordinates)
                    .success(function (data) {
                        $scope.gis = data;
                    })
                    .error(function (e) {
                        $scope.alert = e.error;
                    });
                }
                if ($scope.facility.latest_update) {
                    wrappers.facility_updates.get($scope.facility.latest_update)
                    .success(function (data) {
                        $scope.facility_update = data;
                        $scope.facility_update.facility_updates = JSON.parse(
                            $scope.facility_update.facility_updates
                        );
                        $scope.facility_changes = data.facility_updated_json;
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                }
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.facility_approval = {
                "facility": $scope.facility_id,
                "comment": "",
                "is_cancelled": false
            };

            $scope.approveFacility = function (cancel) {
                $scope.facility_approval.is_cancelled = !!cancel;
                wrappers.facility_approvals.create($scope.facility_approval)
                .success(function () {
                    $state.go("facilities_approve");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            $scope.approveUpdate = function (approved) {
                if (! $scope.facility.latest_update) {
                    return;
                }
                var payload = (approved) ? {"approved": true} : {"cancelled": true};
                wrappers.facility_updates.update($scope.facility.latest_update, payload)
                .success(function () {
                    $state.go("facilities_approve_update");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            $scope.approveFacilityService = function (fsu, approved) {
                var payload = {
                    "is_cancelled": approved ? false : true,
                    "is_confirmed": approved ? true : false
                };
                wrappers.facility_services.update(fsu.id, payload)
                .success(function () {
                    $scope.facility_service_updates = _.without(
                        $scope.facility_service_updates, fsu
                    );
                })
                .error(function (data) {$log.error(data);});
            };
        }]
    );

})(window.angular, window._);
