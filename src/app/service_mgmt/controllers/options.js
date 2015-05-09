(function (angular) {
    "use strict";

    angular.module("mfl.service_mgmt.controllers.options", [
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.option_list",
        ["$scope", "$log", "mfl.service_mgmt.services.options",
        function ($scope, $log, options) {
            options.getOptions().success(function (data) {
                $scope.options = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.option_view",
        ["$scope", "$stateParams", "$log", "mfl.service_mgmt.services.options",
        function ($scope, $stateParams, $log, options) {
            $scope.option_id = $stateParams.option_id;
            options.getOption($scope.option_id).success(function (data) {
                $scope.option = data;
            }).error(function (data) {
                $log.warn(data);
            });
        }
    ])

    .controller("mfl.service_mgmt.controllers.option_edit",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.services.options", "mfl.service_mgmt.forms.changes",
        function ($scope, $state, $stateParams, $log, options, forms) {
            $scope.option_id = $stateParams.option_id;
            $scope.option_types = options.OPTION_TYPES;

            options.getOption($scope.option_id).success(function (data) {
                $scope.option = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    options.updateOption($scope.option_id, changed)
                        .success(function () {
                            $state.go(
                                "service_mgmt.option_view",
                                {"option_id": $scope.option_id}
                            );
                        });
                }
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.option_create",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.services.options",
        function ($scope, $state, $stateParams, $log, options) {
            $scope.option = options.newOption();
            $scope.option_types = options.OPTION_TYPES;

            $scope.save = function () {
                options.createOption($scope.option)
                .success(function (data) {
                    $state.go(
                        "service_mgmt.option_view",
                        {"option_id": data.id}
                    );
                });
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.option_delete",
        ["$scope", "$state", "$stateParams", "$log", "mfl.service_mgmt.services.options",
        function ($scope, $state, $stateParams, $log, options) {
            $scope.option_id = $stateParams.option_id;
            options.getOption($scope.option_id).success(function (data) {
                $scope.option = data;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function () {
                options.deleteOption($scope.option_id)
                .success(function () {
                    $state.go("service_mgmt.option_list");
                });
            };
        }
    ]);

})(angular);
