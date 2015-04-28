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
                tipmsg: "New Services",
                icon: "fa-plus"
            },
            {
                func : "",
                class: "action-btn action-btn-md action-btn-warm ",
                color: "blue",
                tipmsg: "Publish services",
                icon: "fa-tag"
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
    }]);