"use strict";
angular.module("mfl.home.controllers", [])
.controller("mfl.home.controllers.home", ["$scope",
    "mfl.auth.services.login", "$state",
    function ($scope, logoutService, $state) {
    $scope.test="hello";
    $scope.path = [
        {
            name: "Home",
            route: "home"
        }
    ];
    $scope.title = [
        {
            icon: "fa-home",
            name: "Home"
        }
    ];
    $scope.logout = function () {
        logoutService.logout()
            .success(function () {
                $state.go("login");
            })
            .error(function (e) {
                console.log(e);
            });
    };
}]);
