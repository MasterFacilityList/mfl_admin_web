"use strict";

angular.module("mfl.users.controllers", [])

    .controller("mfl.users.controllers.users", ["$scope",
    "mfl.users.services.uses", function ($scope, userServices) {
        $scope.test = "Users";
        $scope.path = [
            {
                name: "Users",
                route: "users"
            }
        ];
        $scope.title = [
            {
                icon: "fa-user",
                name: "Manage Users"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='users.new_user' ",
                class: "action-btn action-btn-warning action-btn-md",
                color: "blue",
                tipmsg: "New User",
                icon: "fa-user-plus"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
        $scope.users = userServices.getUsers();
        console.log($scope.users);
    }]);
