(function (angular) {
    "use strict";

    angular.module("mfl.common.controllers", [
        "mfl.auth.services"
    ])
    .controller("mfl.common.controllers.header", ["$scope", "mfl.auth.services.login",
        function ($scope, loginService) {
            $scope.user = loginService.getUser();
        }
    ]);

})(window.angular);
