(function(angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.publish", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facilities_publish",
        ["$scope", function ($scope) {
            $scope.filters = {
                "is_published": false,
                "approved": true,
                "rejected": false,
                "fields": "id,code,name,facility_type_name,owner_name,county,"+
                          "sub_county,constituency,ward_name,updated"
            };
            $scope.title = {
                "name": "Publish Facilities",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_publish",
        ["$scope", "$log", "$state", "$stateParams", "mfl.facility_mgmt.services.wrappers",
        "mfl.auth.services.login",
        function ($scope, $log, $state, $stateParams, wrappers) {
            $scope.facility_id = $stateParams.facility_id;

            $scope.title = {
                "name": "Publish Facility"
            };

            wrappers.facility_detail.get($scope.facility_id)
            .success(function(data) {
                $scope.facility = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.publish = function (publish) {
                var pub = publish ? true : false;
                wrappers.facility_detail.update($scope.facility_id, {"is_published": pub})
                .success(function () {
                    $state.go("facilities_publish");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    );

})(window.angular);
