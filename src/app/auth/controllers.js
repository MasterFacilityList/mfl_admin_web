(function () {
    "use strict";

    angular.module("mfl.auth.controllers", [
        "mfl.auth.services",
        "ui.router"
    ])

    .controller("mfl.auth.controllers.login",
        ["$scope", "$sce", "$location", "$state", "$stateParams", "mfl.auth.services.login",
        function ($scope, $sce, $location, $state, $stateParams, loginService) {
            $scope.test = "Login";
            $scope.login_err = "";
            $scope.login_err_html = "";

            $scope.submitUser = function(obj) {
                var error_fxn = function (data) {
                    $scope.login_err = data.data.error_description || data.data.detail;
                    $scope.login_err_html =  $sce.trustAsHtml($scope.login_err);
                };
                var success_fxn = function () {
                    var next_state = $stateParams.next || $state.href("dashboard");
                    $location.path(next_state);
                };
                loginService.login(obj)
                    .then(
                        function () {
                            loginService.currentUser().then(success_fxn, error_fxn);
                        },
                        error_fxn
                    );
            };
        }
    ])

    .controller("mfl.auth.controllers.logout",
        ["$state", "mfl.auth.services.login", function ($state, loginService) {
            var callback = function () {
                $state.go("login");
            };
            loginService.logout().then(callback, callback);
        }]
    );

})(angular);
