(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.auth.controllers
     *
     * @description
     * Controllers for the auth related views
     *
     */
    angular.module("mfl.auth.controllers", [
        "mfl.auth.services",
        "ui.router",
        "ngIdle",
        "mfl.common.errors"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.auth.controllers.reset_pwd
     *
     * @description
     * Controller for the password reset view (step 1 of the password reset
     * flow)
     */
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

    /**
     * @ngdoc controller
     *
     * @name  mfl.auth.controllers.reset_pwd_confirm
     *
     * @description
     * Controls the password reset confirmation view (step 2 of the password
     * reset flow)
     */
    .controller("mfl.auth.controllers.reset_pwd_confirm",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.auth.services.profile", "PWD_RULE",
        function ($scope, $state, $stateParams, $log, profileService, PR) {
            $scope.reset_pwd_confirm = function () {
                $scope.PWD_RULE = PR;
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

    /**
     * @ngdoc controller
     *
     * @name mfl.auth.controllers.login
     *
     * @description
     * Manages the login view
     */
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
                    $scope.login_err_html = $sce.trustAsHtml($scope.login_err);
                };
                var success_fxn = function () {
                    $scope.spinner = false;
                    Idle.watch();
                    var load_state = loginService.loadState();
                    loginService.clearState();
                    if (load_state) {
                        $state.go(load_state.name, load_state.params);
                    } else {
                        $state.go(HOME_PAGE_NAME);
                    }
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

    /**
     * @ngdoc controller
     *
     * @name mfl.auth.controllers.logout
     *
     * @description
     * Orchestrates the logout process and views
     */
    .controller("mfl.auth.controllers.logout",
        ["$scope", "$state", "$stateParams", "mfl.auth.services.login", "Idle",
        function ($scope, $state, $stateParams, loginService, Idle) {
            $scope.logout = true;
            var callback = function () {
                Idle.unwatch();
                $state.go("login", {
                    "timeout": $stateParams.timeout,
                    "change_pwd": $stateParams.change_pwd
                });
            };
            return loginService.logout().then(callback, callback);
        }]
    );

})(window.angular);
