"use strict";

angular.module("mfl.auth.controllers", [])

    .controller("mfl.auth.controllers.login", ["$scope", "$state",
        "mfl.auth.services.login",
        function ($scope, $state, loginService) {
            $scope.test = "Login";
            $scope.err = false;
            $scope.submitUser = function(obj) {
                console.log(obj);
                loginService.login(obj)
                    .success(function (data) {
                        console.log(data);
                        loginService.saveUser(obj.username);
                        $state.go("home");
                    })
                    .error(function (e) {
                        console.log(e);
                        $scope.login_err = e.non_field_errors[0];
                        $scope.err = true;
                    });
            };
        }
    ]);
