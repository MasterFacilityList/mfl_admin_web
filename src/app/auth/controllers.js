"use strict";

angular.module("mfl.auth.controllers", [])

    .controller("mfl.auth.controllers.login", ["$scope", "$state",
        "mfl.auth.services.login",
        function ($scope, $state, loginService) {
            $scope.test = "Login";
            $scope.submitUser = function(obj) {
                console.log(obj);
                loginService.login(obj)
                    .success(function (data) {
                        console.log(data);
                        $state.go("home");
                    })
                    .error(function (e) {
                        console.log(e);
                    });
            };
        }
    ]);
