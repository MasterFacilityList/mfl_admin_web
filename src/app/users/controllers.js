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
    }])
    .controller("mfl.users.controllers.new_user", ["$scope",
    function ($scope) {
        $scope.test = "New user";
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "New user",
                route: "users.new_user"
            }
        ];
        $scope.title = [
            {
                icon: "fa-user-plus",
                name: "New user"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.users.controllers.edit_user", ["$scope",
    function ($scope) {
        $scope.test = "Edit user";
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "Edit user",
                route: "users.edit_user"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit user"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.users.controllers.view_user", ["$scope", "mfl.users.services.uses",
    "$stateParams",
    function ($scope, userService, $stateParams) {
        $scope.test = "View user";
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "View user",
                route: "users.view_user"
            }
        ];
        $scope.title = [
            {
                icon: "fa-eye",
                name: "View user"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
        $scope.users = userService.getUsers();
        $scope.getOneUser = function () {
            $scope.oneUser = _.findWhere(
                $scope.users.results, {"id" : $stateParams.user_id});
            return $scope.oneUser;
        };
    }]);
