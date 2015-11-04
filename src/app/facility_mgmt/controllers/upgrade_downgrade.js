(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.upgrade_downgrade", [
        "mfl.facility_mgmt.services",
        "mfl.facility_mgmt.controllers.edit",
        "angular-toasty"
    ])

    .controller("mfl.facility_mgmt.controllers.updown_helper",
        ["$log", "mfl.facility_mgmt.services.wrappers", "mfl.error.messages",
        "toasty", "$state", "$stateParams",
        function ($log, wrappers, errorMessages, toasty, $state, $stateParams){
            var load = function ($scope) {
                $scope.facility_id = $stateParams.facility_id;
                $scope.new_type = {
                    facility_type: "",
                    keph_level: "",
                    reason: "",
                    facility: $scope.facility_id
                };
                $scope.filters = {"facility" : $scope.facility_id};
                wrappers.facility_upgrade.filter(
                    {facility: $scope.facility_id, is_cancelled: false, is_confirmed: false}
                )
                .success(function (data) {
                    $scope.new_type = data.results[0] || $scope.new_type;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });

                wrappers.facility_types.filter(
                    {page_size: 100, "ordering": "name", "fields": "id,name"}
                )
                .success(function(data) {
                    $scope.facility_types = data.results;
                })
                .error(function(data) {
                    $log.error(data);
                    $scope.errors = data;
                });

                wrappers.keph_levels.filter({fields: "id,name", ordering: "name"})
                .success(function (data) {
                    $scope.keph_levels = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });

                wrappers.change_reasons.filter({fields: "id,reason"})
                .success(function (data) {
                    $scope.change_reasons = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });

                wrappers.facilities.get(
                    $scope.facility_id, {"fields": "keph_level_name,facility_type_name"}
                )
                .success(function (data) {
                    $scope.facility = data;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            };

            var updateType = function ($scope) {
                wrappers.facility_upgrade.create($scope.new_type)
                .success(function (data) {
                    $scope.new_type.id = data.id;
                    toasty.success({
                        title: "Facility" + $scope.msg,
                        msg: "Facility has been " + $scope.msg + " successfully"
                    });
                    $state.go("facilities", {reload : true});
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };

            this.bootstrap = function ($scope, is_upgrade) {
                $scope.upgrade = is_upgrade;
                $scope.msg = is_upgrade ? "Upgrade" : "Downgrade";
                load($scope);
                $scope.updateType = function () {
                    updateType($scope);
                };
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_upgrade",
        ["$scope", "$controller", function ($scope, $controller) {
            $scope.updown = true;
            $scope.viewServices = true;
            var updownHelper = $controller("mfl.facility_mgmt.controllers.updown_helper");
            var srvHelper = $controller("mfl.facility_mgmt.controllers.services_helper");
            srvHelper.bootstrap($scope);
            updownHelper.bootstrap($scope, true);
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_downgrade",
        ["$scope", "$controller",
        function ($scope, $controller) {
            $scope.updown = true;
            $scope.viewServices = true;
            var updownHelper = $controller("mfl.facility_mgmt.controllers.updown_helper");
            var srvHelper = $controller("mfl.facility_mgmt.controllers.services_helper");
            srvHelper.bootstrap($scope);
            updownHelper.bootstrap($scope, false);
        }]
    );

})(window.angular);
