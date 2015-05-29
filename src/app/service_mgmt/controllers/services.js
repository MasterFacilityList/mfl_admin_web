(function (angular) {

    angular.module("mfl.service_mgmt.controllers.services", [
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.service_list", [angular.noop])

    .controller("mfl.service_mgmt.controllers.service_edit",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.wrappers", "mfl.common.forms.changes",
        function ($scope, $state, $stateParams, $log, wrappers, forms) {
            $scope.service_id = $stateParams.service_id;
            wrappers.services.get($scope.service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
            wrappers.categories.filter({page_size: 1000}).success(function (data) {
                $scope.categories = data.results;
            });
            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    wrappers.services.update($scope.service_id, changed)
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
        ["$scope", "$state", "$stateParams", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.service = wrappers.newService();
            wrappers.categories.list({page_size: 1000}).success(function (data) {
                $scope.categories = data.results;
            });

            $scope.save = function () {
                wrappers.services.create($scope.service)
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
        ["$scope", "$state", "$stateParams", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.service_id = $stateParams.service_id;
            wrappers.services.get($scope.service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function () {
                wrappers.services.remove($scope.service_id)
                .success(function () {
                    $state.go("service_mgmt.service_list");
                });
            };
        }
    ]);

})(angular);
