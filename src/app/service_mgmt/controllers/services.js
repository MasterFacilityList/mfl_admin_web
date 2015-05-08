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
            var service_id = $stateParams.service_id;
            services.getService(service_id).success(function (data) {
                $scope.service = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_edit",
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

    .controller("mfl.service_mgmt.controllers.service_delete",
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
    ;

})(angular);
