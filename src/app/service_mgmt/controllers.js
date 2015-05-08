(function (angular) {

    angular.module("mfl.service_mgmt.controllers", [
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.service_mgmt", [function () {}])

    .controller("mfl.service_mgmt.controllers.service_mgmt.toc", [function () {

    }])

    .controller("mfl.service_mgmt.controllers.service_mgmt.service_list",
        ["$scope", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $log, services) {
            services.getServices().success(function (data) {
                $scope.services = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_mgmt.service_view",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $stateParams, $log, services) {
            var service_id = $stateParams.service_id;
            services.getService(service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_mgmt.service_edit",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $stateParams, $log, services) {
            var service_id = $stateParams.service_id;
            services.getService(service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_mgmt.service_delete",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.services",
        function ($scope, $stateParams, $log, services) {
            var service_id = $stateParams.service_id;
            services.getService(service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_mgmt.category_list",
        ["$scope", "$log", "mfl.service_mgmt.services.categories",
        function ($scope, $log, categories) {
            categories.getCategories().success(function (data) {
                $scope.categories = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_mgmt.category_view",
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

    .controller("mfl.service_mgmt.controllers.service_mgmt.category_edit",
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

    .controller("mfl.service_mgmt.controllers.service_mgmt.category_delete",
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
    ;

})(angular);
