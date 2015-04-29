"use strict";

angular.module("mfl.chus.controllers", [])

    .controller("mfl.chus.controllers.chus", ["$scope",
    "mfl.chus.services.chus", function ($scope, chusService) {
        $scope.test = "chus";
        $scope.path = [
            {
                name: "CHUS",
                route: "chus"
            }
        ];
        $scope.title = [
            {
                icon: "fa-sitemap",
                name: "CHUS"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='chus.new_chu' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New CHU",
                icon: "fa-plus"
            }
        ];

        $scope.chus = chusService.getChus();
    }])
    .controller("mfl.chus.controllers.new_chu",["$scope",function ($scope) {
        $scope.path = [
            {
                name: "CHUS",
                route: "chus"
            },{
                name: "new CHU",
                route: "new_chus"
            }
        ];
        $scope.title = [
            {
                icon: "fa-sitemap",
                name: "New CHU"
            }
        ];
        $scope.action = [
            {
                func : "",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Save",
                icon: "fa-save"
            }
        ];
    }])
    .controller("mfl.chus.controllers.edit_chu",["$scope",function ($scope) {
        $scope.path = [
            {
                name: "CHUS",
                route: "chus"
            },{
                name: "Edit CHU",
                route: "edit_chus"
            }
        ];
        $scope.title = [
            {
                icon: "fa-sitemap",
                name: "Edit CHU"
            }
        ];
        $scope.action = [
            {
                func : "",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Save",
                icon: "fa-save"
            },{
                func : "ui-sref='chus.new_chu'",
                class: "action-btn action-btn-primary action-btn-md",
                color: "green",
                tipmsg: "New CHU",
                icon: "fa-plus"
            }
        ];
    }]);
