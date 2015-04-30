"use strict";

angular.module("mfl.auth.controllers", [])

    .controller("mfl.auth.controllers.login", ["$scope", "$state",
        function ($scope, $state) {
            $scope.test = "Login";
            $scope.submitUser = function(obj) {
                console.log(obj);
                $state.go("home");
            };
        }
    ]);
