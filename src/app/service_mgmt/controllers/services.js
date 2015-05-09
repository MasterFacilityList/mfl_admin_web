(function (angular) {

    angular.module("mfl.service_mgmt.controllers.services", [
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.service_list",
        ["$scope", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $log, services) {
            services.getServices().success(function (data) {
                $scope.services = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_view",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $stateParams, $log, services) {
            $scope.service_id = $stateParams.service_id;
            services.getService($scope.service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_edit",
        ["$scope", "$stateParams", "$log",
        "mfl.service_mgmt.services.services", "mfl.service_mgmt.services.categories",
        "mfl.service_mgmt.forms.changes",
        function ($scope, $stateParams, $log, services, categories, forms) {
            $scope.service_id = $stateParams.service_id;
            services.getService($scope.service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
            categories.getCategories(true).success(function (data) {
                $scope.categories = data.results;
            });
            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    services.updateService($scope.service_id, changed)
                        .success(function () {
                            $state.go(
                                "service_mgmt.service_view",
                                {"service_id": $scope.service_id}
                            );
                        });
                }
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_create",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.services.services", "mfl.service_mgmt.services.categories",
        function ($scope, $state, $stateParams, $log, services, categories) {
            $scope.service = services.newService();
            categories.getCategories(true).success(function (data) {
                $scope.categories = data.results;
            });

            $scope.save = function () {
                services.createService($scope.service)
                .success(function (data) {
                    $state.go(
                        "service_mgmt.service_view",
                        {"service_id": data.id}
                    );
                });
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_delete",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $stateParams, $log, services) {
            $scope.service_id = $stateParams.service_id;
            services.getService($scope.service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function () {
                services.deleteService($scope.service_id)
                .success(function () {
                    $state.go("sservice_mgmt.service_list");
                });
            };
        }
    ])
    ;

})(angular);
