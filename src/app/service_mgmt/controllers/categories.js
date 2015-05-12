(function (angular, _) {

    angular.module("mfl.service_mgmt.controllers.categories", [
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.category_list",
        ["$scope", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $log, wrappers) {
            wrappers.categories.list().success(function (data) {
                $scope.categories = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_view",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $stateParams, $log, wrappers) {
            $scope.category_id = $stateParams.category_id;
            wrappers.categories.get($scope.category_id).success(function (data) {
                $scope.category = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_edit",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.wrappers", "mfl.service_mgmt.forms.changes",
        function ($scope, $state, $stateParams, $log, wrappers, forms) {
            $scope.category_id = $stateParams.category_id;

            wrappers.categories.get($scope.category_id).success(function (data) {
                $scope.category = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    wrappers.categories.update($scope.category_id, changed)
                        .success(function () {
                            $state.go(
                                "service_mgmt.category_view",
                                {"category_id": $scope.category_id}
                            );
                        });
                }
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_create",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.category = wrappers.newCategory();

            $scope.save = function () {
                wrappers.categories.create($scope.category)
                .success(function (data) {
                    $state.go(
                        "service_mgmt.category_view",
                        {"category_id": data.id}
                    );
                });
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_delete",
        ["$scope", "$state", "$stateParams", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.category_id = $stateParams.category_id;
            wrappers.categories.get($scope.category_id).success(function (data) {
                $scope.category = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function () {
                wrappers.categories.remove($scope.category_id)
                .success(function () {
                    $state.go("service_mgmt.category_list");
                });
            };
        }
    ])
    ;

})(angular, _);
