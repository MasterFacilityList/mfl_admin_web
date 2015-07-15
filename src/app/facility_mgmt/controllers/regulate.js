(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.regulate", [
        "mfl.facility_mgmt.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facilities_regulation",
        ["$scope", function ($scope) {
            $scope.filters = {
                "regulated": false
            };
            $scope.title = {
                "name": "Regulate Facilities",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facilities_regulation_approval",
        ["$scope", function ($scope) {
            $scope.filters = {
                "regulated": false
            };
            $scope.title = {
                "name": "Approve Facility Regulations",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_regulate",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.facility_mgmt.services.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.facility_id = $stateParams.facility_id;
            wrappers.facility_detail.get($scope.facility_id)
            .success(function(data) {
                $scope.facility = data;
            })
            .error(function (data) {
                $log.error(data);
            });
            wrappers.regulation_status.filter({"ordering": "name"})
            .success(function (data) {
                $scope.regulation_status = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.regulation = {
                "facility": $scope.facility_id,
                "regulation_status": "",
                "reason": "",
                "license_number": "",
                "regulating_body": "344150ec-2f85-47fc-abf9-336765369eca"
            };
            $scope.regulateFacility = function () {
                wrappers.facility_regulation_status.create($scope.regulation)
                .success(function () {$state.go("^");})
                .error(function (data) {$log.error(data);});
            };
        }]
    );

})(angular);
