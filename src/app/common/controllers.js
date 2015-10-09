(function (angular, _) {
    "use strict";

    angular.module("mfl.common.controllers", [
        "mfl.auth.services"
    ])
    .controller("mfl.common.controllers.header",
        ["$rootScope", "$state", "$scope", "mfl.auth.services.login",
        function ($rootScope, $state, $scope, loginService) {
            $scope.user = loginService.getUser();
            $rootScope.$on("IdleTimeout", function () {
                if (loginService.isLoggedIn() || $state.current.name !== "login") {
                    loginService.dumpState($state.current, $state.params);
                    $state.go("logout", {"timeout": "true"});
                }
            });
        }]
    );

})(window.angular, window._);
