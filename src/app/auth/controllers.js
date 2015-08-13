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
        ["$scope", "$state", "$stateParams", "$log", "mfl.auth.services.profile",
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
        ["$scope", "$sce", "$state", "$stateParams", "Idle",
        "mfl.auth.services.login", "HOME_PAGE_NAME",
        function ($scope, $sce, $state, $stateParams, Idle, loginService, HOME_PAGE_NAME) {
            $scope.login_err = "";
            $scope.login_err_html = "";
            $scope.params = $stateParams;
            $scope.submitUser = function(obj) {
                $scope.spinner = true;
                var error_fxn = function (data) {
                    $scope.spinner = false;
                    $scope.login_err = data.data.error_description ||
                        data.data.detail ||
                        "Sorry, a connection error occurred";
                    $scope.login_err_html =  $sce.trustAsHtml($scope.login_err);
                };
                var success_fxn = function () {
                    $scope.spinner = false;
                    var next_state = $stateParams.next || HOME_PAGE_NAME;
                    $state.go(next_state).then(function () {
                        Idle.watch();
                    });
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
        ["$state", "mfl.auth.services.login", "Idle", function ($state, loginService, Idle) {
            var callback = function () {
                $state.go("login").then(function () {
                    Idle.unwatch();
                });
            };
            loginService.logout().then(callback, callback);
        }]
    );

})(window.angular);
