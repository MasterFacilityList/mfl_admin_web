(function (angular) {
    "use strict";

    angular.module("mfl.common.controllers", [
        "mfl.auth.services"
    ])
    .controller("mfl.common.controllers.header",
        ["$rootScope", "$location", "$state", "$scope", "mfl.auth.services.login",
        function ($rootScope, $location, $state, $scope, loginService) {
            $scope.user = loginService.getUser();
            $rootScope.$on("IdleTimeout", function () {
                if (loginService.isLoggedIn() || $state.current.name !== "login") {
                    $state.go("logout", {"timeout": "true", "next": $location.path()});
                }
            });
        }]
    );

})(window.angular);
