(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.regulate", [
        "mfl.facility_mgmt.services",
        "angular-toasty"
    ])

    .controller("mfl.facility_mgmt.controllers.facilities_regulation",
        ["$scope", function ($scope) {
            $scope.filters = {
                "regulated": false,
                "rejected": false,
                "fields": "id,code,official_name,facility_type_name,owner_name,county,"+
                          "sub_county,constituency,ward_name,updated"
            };
            $scope.title = {
                "name": "Regulate Facilities",
                "icon": "fa-building"
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_regulate",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.facility_mgmt.services.wrappers", "toasty",
        function ($scope, $state, $stateParams, $log, wrappers, toasty) {
            $scope.facility_id = $stateParams.facility_id;
            $scope.spinner = true;
            $scope.regulation = {
                "facility": $scope.facility_id,
                "regulation_status": "",
                "reason": "",
                "license_number": "",
                "regulating_body": ""
            };

            wrappers.facility_detail.get($scope.facility_id)
            .success(function(data) {
                $scope.facility = data;
                $scope.spinner = false;
                $scope.regulation.regulating_body = $scope.facility.regulatory_body;
            })
            .error(function (data) {
                $log.error(data);
                $scope.errors = data;
            });
            wrappers.regulation_status.filter({"ordering": "name"})
            .success(function (data) {
                $scope.regulation_status = data.results;
            })
            .error(function (data) {
                $log.error(data);
                $scope.errors = data;
            });
            $scope.regulateFacility = function () {
                wrappers.facility_regulation_status.create($scope.regulation)
                .success(function () {
                    toasty.success({
                        title : "Regulate Facility",
                        msg : "Facility successfully regulated"
                    });
                    $state.go("facilities_regulation");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.regulator_sync.update",
        ["$scope", "$stateParams", "$state", "mfl.facility_mgmt.services.wrappers", "toasty",
        function ($scope, $stateParams, $state, wrappers, toasty) {
            $scope.title = { "name": "Synchronize Regulated Facilities" };
            $scope.sync_id = $stateParams.sync_id;
            wrappers.regulator_sync.get($scope.sync_id, {
                "fields": "name,probable_matches,registration_number,"+
                          "regulatory_body_name,owner_name,facility_type_name"+
                          "probable_matches,mfl_code"
            })
            .success(function (data) { $scope.sync_obj = data; })
            .error(function (data) { $scope.errors = data; });

            $scope.updateSyncObject = function (mfl_code) {
                var r = wrappers.regulator_sync_update;
                r.callApi(
                    "POST",
                    r.makeUrl(r.apiBaseUrl+$scope.sync_id+"/"),
                    {"mfl_code": mfl_code}
                )
                .success(function () {
                    toasty.success({
                        "title": "Facility Synchronized",
                        "msg": "The facility has been updated with regulatory details"
                    });
                    $state.go("facilities_regulator_sync");
                })
                .error(function (data) { $scope.errors = data; });
            };
        }]
    );

})(window.angular);
