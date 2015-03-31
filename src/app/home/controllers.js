"use strict";
angular.module("mfl.home.controllers", [])
.controller("mfl.home.controllers.home", ["$scope", function ($scope) {
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
}]);