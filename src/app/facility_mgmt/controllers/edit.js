(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.edit", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

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
            $scope.action = [
                {
                    func: "require-permission='facilities.add_facilityapproval' " +
                          "ng-if='!facility.is_approved || facility.has_edits' " +
                          "ui-sref='facilities.facility_edit({facility_id: facility_id})'",
                    class: "action-btn action-btn-md action-btn-primary",
                    icon: "fa-check",
                    tipmsg: "Approve"
                },
                {
                    func: "require-permission='facilities.change_facility' " +
                          "ng-if='login_user.is_national' " +
                          "ui-sref='.publish({facility_id: facility_id})'",
                    class: "action-btn action-btn-md action-btn-primary",
                    icon: "fa-upload",
                    tipmsg: "Publish"
                },
                {
                    func: "require-permission='facilities.add_facilityregulationstatus' " +
                          "ng-if='login_user.regulator' " +
                          "ui-sref='facilities.facility_edit({facility_id: facility_id})'",
                    class: "action-btn action-btn-md action-btn-primary",
                    icon: "fa-legal",
                    tipmsg: "Regulate"
                },
                {
                    func: "ui-sref='facilities.facility_edit({facility_id: facility_id})'",
                    class: "action-btn action-btn-md action-btn-primary",
                    icon: "fa-level-up",
                    tipmsg: "Upgrade"
                },
                {
                    func: "ui-sref='facilities.facility_edit({facility_id: facility_id})'",
                    class: "action-btn action-btn-md action-btn-primary",
                    icon: "fa-level-down",
                    tipmsg: "Downgrade"
                }
            ];
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
