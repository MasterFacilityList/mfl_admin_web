(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facility_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "Facility Management"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit",
        ["$scope", "$log", "$stateParams", "mfl.facility_mgmt.services.wrappers",
        "mfl.auth.services.login",
        function ($scope, $log, $stateParams, wrappers, loginService) {
            $scope.title = {
                "name": "Edit Facility"
            };
            $scope.facility_id = $stateParams.facility_id;
            wrappers.facility_detail.get($scope.facility_id)
                .success(function(data){
                    $scope.facility = data;
                })
                .error(function (data) {
                    $log.error(data);
                });
            $scope.login_user = loginService.getUser();
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.basic",
        ["$scope", "$log", "$stateParams", "mfl.facility_mgmt.services.wrappers",
        function ($scope, $log, $stateParams, wrappers) {
            wrappers.facility_owners.filter({page_size: 100, "ordering": "name"})
            .success(function(data) {
                $scope.facility_owners = data.results;
            })
            .error(function(data) {
                $log.error(data);
            });

            wrappers.facility_types.filter({page_size: 100, "ordering": "name"})
            .success(function(data) {
                $scope.facility_types = data.results;
            })
            .error(function(data) {
                $log.error(data);
            });

            wrappers.wards.filter(
                {page_size: 500, "ordering": "name", "county": $scope.login_user.county})
            .success(function (data) {
                $scope.wards = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });

            wrappers.towns.filter({page_size: 50000, "ordering": "name"})
            .success(function (data) {
                $scope.towns = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.save = function () {};
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.contacts", [angular.noop])
    .controller("mfl.facility_mgmt.controllers.facility_edit.services", [angular.noop])
    .controller("mfl.facility_mgmt.controllers.facility_edit.units", [angular.noop])
    .controller("mfl.facility_mgmt.controllers.facility_edit.officers", [angular.noop])
    .controller("mfl.facility_mgmt.controllers.facility_edit.setup", [angular.noop])
;

})(angular);
