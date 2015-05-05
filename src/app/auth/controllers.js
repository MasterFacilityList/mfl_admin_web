"use strict";

angular.module("mfl.auth.controllers", [])

    .controller("mfl.auth.controllers.login", ["$scope", "$state",
        "mfl.auth.services.login",
        function ($scope, $state, loginService) {
            $scope.test = "Login";
            $scope.err = false;
            $scope.submitUser = function(obj) {
                loginService.login(obj)
                    .success(function () {
                        loginService.currentUser()
                            .success(function (curr_usr) {
                                loginService.saveUser(curr_usr);
                                $state.go("home");
                            })
                            .error(function (e) {
                                console.log(e);
                            });
                    })
                    .error(function (e) {
                        console.log(e);
                        $scope.login_err = e.non_field_errors[0];
                        $scope.err = true;
                    });
            };
        }
    ]);
