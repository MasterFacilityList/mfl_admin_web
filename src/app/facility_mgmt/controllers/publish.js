(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.publish", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facilities_publish",
        ["$scope", "$state", function ($scope, $state) {
            console.log($state);
            $scope.filters = {
                "is_published": false
            };
            $scope.title = {
                "name": "Facilities Pending Publishing",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_publish",
        ["$scope", "$log", "$state", "$stateParams", "mfl.facility_mgmt.services.wrappers",
        "mfl.auth.services.login",
        function ($scope, $log, $state, $stateParams, wrappers) {
            $scope.title = {
                "name": "Publish Facility"
            };

            $scope.publish = function () {
                wrappers.facility_detail.update($scope.facility_id, {"is_published": true})
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
