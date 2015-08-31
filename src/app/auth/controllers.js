(function (angular) {
    "use strict";

    angular.module("mfl.auth.controllers", [
        "mfl.auth.services",
        "ui.router",
        "ngIdle"
    ])

    .controller("mfl.auth.controllers.reset_pwd",
        ["$scope", "$state", "$log", "mfl.auth.services.profile",
        function ($scope, $state, $log, profileService) {
            $scope.reset_pwd = function () {
                profileService.resetPassword($scope.email)
                .then(function () {
                    $state.go("login", {"reset_pwd": "true"});
                },
                function (data) {
                    $log.error(data);
                    $scope.errors = data.data;
                });
            };
        }]
    )

    .controller("mfl.auth.controllers.reset_pwd_confirm",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.auth.services.profile",
        function ($scope, $state, $stateParams, $log, profileService) {
            $scope.reset_pwd_confirm = function () {
                profileService.resetPasswordConfirm(
                    $stateParams.uid, $stateParams.token,
                    $scope.new_password1, $scope.new_password2
                )
                .then(function () {
                    $state.go("login", {"reset_pwd_confirm": "true"});
                },
                function (data) {
                    $log.error(data);
                    var errs = data.data || data;
                    if (errs.uid || errs.token) {
                        errs[""] = ["Invalid password reset token."];
                        delete errs.uid;
                        delete errs.token;
                    }
                    delete errs.error_msg;
                    $scope.errors = errs;
                });
            };
        }]
    )

    .controller("mfl.auth.controllers.login",
        ["$scope", "$state", "$stateParams", "$window", "Idle",
        "mfl.auth.services.login", "HOME_PAGE_NAME",
        function ($scope, $state, $stateParams, $window, Idle, loginService, HOME_PAGE_NAME) {
            $scope.login_err = "";
            $scope.params = $stateParams;

            $scope.submitUser = function(obj) {
                $scope.spinner = true;
                var error_fxn = function (data) {
                    $scope.spinner = false;
                    $scope.login_err = data.data.error_description ||
                                       data.data.detail ||
                                       "Sorry, a connection error occurred";
                };
                var success_fxn = function () {
                    $scope.spinner = false;
                    Idle.watch();
                    var next_url = $stateParams.next || $state.href(HOME_PAGE_NAME);
                    next_url = $window.decodeURIComponent(next_url);
                    $window.location.assign(next_url);
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
        ["$scope", "$state", "$window", "$stateParams", "mfl.auth.services.login", "Idle",
        function ($scope, $state, $window, $stateParams, loginService, Idle) {
            $scope.logout = true;
            var callback = function () {
                Idle.unwatch();
                $state.go("login", {
                    "timeout": $stateParams.timeout,
                    "next": $stateParams.next ?
                            $window.decodeURIComponent($stateParams.next) : undefined,
                    "change_pwd": $stateParams.change_pwd
                });
            };
            return loginService.logout().then(callback, callback);
        }]
    );

})(window.angular);
