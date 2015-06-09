(function () {
    "use strict";

    angular.module("mfl.auth.controllers", [
        "mfl.auth.services",
        "ui.router"
    ])

    .controller("mfl.auth.controller.reset_pwd",
        ["$scope", "$log", "mfl.auth.services.profile", function ($scope, $log, profileService) {
            $scope.email = "";

            $scope.reset_pwd = function () {
                profileService.resetPassword($scope.email)
                    .success(angular.noop)
                    .error(function (data) {
                        $log.error(data);
                    });
            };
        }]
    )

    .controller("mfl.auth.controller.reset_pwd_confirm",
        ["$scope", "$stateParams", "$log", "mfl.auth.services.profile",
        function ($scope, $stateParams, $log, profileService) {
            $scope.reset_pwd_confirm = function () {
                profileService.resetPasswordConfirm(
                    $stateParams.uid, $stateParams.token,
                    $scope.new_password1, $scope.new_password2
                )
                .success(angular.noop)
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.auth.controllers.login",
        ["$scope", "$sce", "$state", "$stateParams", "mfl.auth.services.login", "HOME_PAGE_NAME",
        function ($scope, $sce, $state, $stateParams, loginService, HOME_PAGE_NAME) {
            $scope.test = "Login";
            $scope.login_err = "";
            $scope.login_err_html = "";

            $scope.submitUser = function(obj) {
                var error_fxn = function (data) {
                    $scope.login_err = data.data.error_description || data.data.detail;
                    $scope.login_err_html =  $sce.trustAsHtml($scope.login_err);
                };
                var success_fxn = function () {
                    var next_state = $stateParams.next || HOME_PAGE_NAME;
                    $state.go(next_state);
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
