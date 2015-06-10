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
                    func : "ui-sref='facilities_view' " +
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
        )
    .controller("mfl.facilities.controllers.view.approve", ["$scope",
        "$stateParams", "mfl.facilities.wrappers",
        "mfl.facilities.wrappers", function($scope, $stateParams, facilityApi){
            $scope.title = [
                {
                    icon: "fa-check",
                    name: "Approve Facility"
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
            $scope.facility = {facilityId: $stateParams.facilityId};
            var promise = facilityApi.facilities.get($stateParams.facilityId);
            facilityApi.utils.resolvePromise($scope, $scope, "facility_data", promise);
            $scope.facility_approvals = [];
            facilityApi.utils.resolvePromise(
                $scope, $scope, "facility_approvals",
                facilityApi.facility_approval.filter({facility: $stateParams.facilityId})
            );
            $scope.approveFacility = function(approval){
                approval.facility = $stateParams.facilityId;
                facilityApi.facility_approval.create(facilityApi.utils.cleanFormData(approval))
                .success(function(data){
                    $scope.approval = {
                        comment: ""
                    };
                    $scope.facility_approvals.push(data);
                }).error(function(error){
                    $scope.alert = facilityApi.utils.getError(error);
                });
            };
        }]
        )

    .controller("mfl.facilities.controllers.view.add_unit", ["$scope",
        "$stateParams", "mfl.facilities.wrappers",
        "mfl.facilities.wrappers", function($scope, $stateParams, facilityApi){
            $scope.title = [
                {
                    icon: "fa-plus",
                    name: "Add Facility Unit"
                }
            ];
            $scope.facility = $stateParams.facilityId;
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
            $scope.facility = {facilityId: $stateParams.facilityId};
            var promise = facilityApi.facilities.get($stateParams.facilityId);
            facilityApi.utils.resolvePromise($scope, $scope, "facility_data", promise);
            $scope.getOptionsData = {
                getData: function(api, callback, what){
                    api.list()
                    .success(function(data){
                        callback(data[what]);
                    }).error(function(error){
                        callback([]);
                        $scope.alert = error.error;
                    });
                },
                regulatingBody: function(callback){
                    $scope.getOptionsData.getData(
                        facilityApi.regulating_body, callback, "results");
                },
                regulationStatus: function(callback){
                    $scope.getOptionsData.getData(
                        facilityApi.regulation_status, callback, "results");
                }

            };
            $scope.facility_units = [];
            facilityApi.utils.resolvePromise(
                $scope, $scope, "facility_units",
                facilityApi.facility_unit.filter({facility: $stateParams.facilityId})
            );
            $scope.saveFacilityUnit = function(unit){
                unit.facility = $stateParams.facilityId;
                facilityApi.facility_unit.create(facilityApi.utils.cleanFormData(unit))
                .success(function(data){
                    $scope.facility_units.push(data);
                }).error(function(error){
                    $scope.alert = facilityApi.utils.getError(error);
                });
            };
        }]
        )
    .controller("mfl.facilities.controllers.view.upgrade", ["$scope",
        "$stateParams", "mfl.facilities.wrappers",
        "mfl.facilities.wrappers", function($scope, $stateParams, facilityApi){
            $scope.title = [
                {
                    icon: "fa-up",
                    name: "Upgrade Facility"
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
            $scope.facility = {facilityId: $stateParams.facilityId};
            var promise = facilityApi.facilities.get($stateParams.facilityId);
            facilityApi.utils.resolvePromise($scope, $scope, "facility_data", promise);
            $scope.getOptionsData = {
                getData: function(callback, what){
                    facilityApi.filterOptions.filter({fields: what})
                    .success(function(data){
                        callback(data[what]);
                    }).error(function(error){
                        callback([]);
                        $scope.alert = facilityApi.utils.getError(error);
                    });
                },
                facilityType: function(callback){
                    $scope.getOptionsData.getData(callback, "facility_type");
                }
            };

            $scope.facility_upgrades = [];
            facilityApi.utils.resolvePromise(
                $scope, $scope, "facility_upgrades",
                facilityApi.facility_upgrade.filter({facility: $stateParams.facilityId})
            );
            $scope.upgradeFacility = function(upgrade){
                upgrade.facility = $stateParams.facilityId;
                var patch_data = {
                    facility_type: facilityApi.utils.cleanFormData(upgrade.facility_type).id
                };
                facilityApi.facilities.update($stateParams.facilityId, patch_data)
                .success(function(){
                    facilityApi.facility_upgrade.create(facilityApi.utils.cleanFormData(upgrade))
                    .success(function(data){
                        $scope.facility_upgrades.push(data);
                        $scope.upgrade = {
                            reason: "",
                            is_confirmed: false,
                            is_cancelled: false
                        };
                    }).error(function(error){
                        $scope.alert = facilityApi.utils.getError(error);
                    });
                }).error(function(error){
                    $scope.alert = facilityApi.utils.getError(error);
                });
            };
        }])

    .controller("mfl.facilities.controllers.view.mutate_op_status", ["$scope",
        "$stateParams", "mfl.facilities.wrappers",
        "mfl.facilities.wrappers", function($scope, $stateParams, facilityApi){
            $scope.title = [
                {
                    icon: "fa-building",
                    name: "Change Operation Status"
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
            $scope.facility = {facilityId: $stateParams.facilityId};
            var promise = facilityApi.facilities.get($stateParams.facilityId);
            facilityApi.utils.resolvePromise($scope, $scope, "facility_data", promise);
            $scope.getOptionsData = {
                getData: function(callback, what){
                    facilityApi.filterOptions.filter({fields: what})
                    .success(function(data){
                        callback(data[what]);
                    }).error(function(error){
                        callback([]);
                        $scope.alert = facilityApi.utils.getError(error);
                    });
                },
                operationStatus: function(callback){
                    $scope.getOptionsData.getData(callback, "operation_status");
                }
            };

            $scope.facility_statuses = [];
            facilityApi.utils.resolvePromise(
                $scope, $scope, "facility_statuses",
                facilityApi.facility_operation_status.filter({facility: $stateParams.facilityId})
            );
            $scope.changeOperationStatus = function(status){
                status.facility = $stateParams.facilityId;
                var patch_data = {
                    operation_status: facilityApi.utils.cleanFormData(status.operation_status).id
                };
                facilityApi.facilities.update($stateParams.facilityId, patch_data)
                .success(function(){
                    facilityApi.facility_operation_status.create(
                        facilityApi.utils.cleanFormData(status))
                    .success(function(data){
                        $scope.facility_statuses.push(data);
                        $scope.status = {
                            reason: ""
                        };
                    }).error(function(error){
                        $scope.alert = facilityApi.utils.getError(error);
                    });
                }).error(function(error){
                    $scope.alert = facilityApi.utils.getError(error);
                });
            };
        }]
        );
})(angular);

