(function (angular) {
    "use strict";

    angular.module("mfl.common.controllers", [
        "mfl.auth.services"
    ])

    .controller("mfl.common.controllers.header", ["$scope", "mfl.auth.services.login",
        function ($scope, loginService) {
            $scope.user = loginService.getUser();
        }
    ])
    .controller("mfl.common.controllers.stateSetup", ["$state",
        function ($state) {
            $state.go("setup.counties");
        }
    ])
    .controller("mfl.common.controllers.stateServices", ["$state",
        function ($state) {
            $state.go("service_mgmt.category_list");
        }
    ]);

})(angular);
