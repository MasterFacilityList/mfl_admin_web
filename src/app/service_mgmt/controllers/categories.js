(function (angular, _) {

    angular.module("mfl.service_mgmt.controllers.categories", [
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.category_list",
        ["$scope", "$log", "mfl.service_mgmt.services.categories",
        function ($scope, $log, categories) {
            categories.getCategories().success(function (data) {
                $scope.categories = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_view",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.categories",
        function ($scope, $stateParams, $log, categories) {
            $scope.category_id = $stateParams.category_id;
            categories.getCategory($scope.category_id).success(function (data) {
                $scope.category = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_edit",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.services.categories", "mfl.service_mgmt.forms.changes",
        function ($scope, $state, $stateParams, $log, categories, forms) {
            $scope.category_id = $stateParams.category_id;

            categories.getCategory($scope.category_id).success(function (data) {
                $scope.category = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    categories.updateCategory($scope.category_id, changed)
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
        "mfl.service_mgmt.services.categories",
        function ($scope, $state, $stateParams, $log, categories) {
            $scope.category = categories.newCategory();

            $scope.save = function () {
                categories.createCategory($scope.category)
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
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.categories",
        function ($scope, $stateParams, $log, categories) {
            $scope.category_id = $stateParams.category_id;
            categories.getCategory($scope.category_id).success(function (data) {
                $scope.category = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function () {
                categories.deleteCategory($scope.category_id)
                .success(function () {
                    $state.go("service_mgmt.category_list");
                });
            };
        }
    ])
    ;

})(angular, _);
