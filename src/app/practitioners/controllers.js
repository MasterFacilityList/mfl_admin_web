"use strict";

angular.module("mfl.practitioners.controllers", [])

    .controller("mfl.practitioners.controllers.practitioners", ["$scope",
    "mfl.practitioners.services.practitioners", function ($scope, practitionersService) {
        $scope.test = "practitioners";
        $scope.path = [
            {
                name: "Practitioners",
                route: "practitioners"
            }
        ];
        $scope.title = [
            {
                icon: "fa-user-md",
                name: "Practitioners"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='practitioners.new_practitioner' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Practitioner",
                icon: "fa-user-plus"
            }
        ];

        $scope.practitioners = practitionersService.getPractitioners();
    }])
    .controller("mfl.practitioners.controllers.new_practitioner",["$scope",function ($scope) {
        $scope.path = [
            {
                name: "CHUS",
                route: "practitioners"
            },{
                name: "new CHU",
                route: "new_practitioners"
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
    .controller("mfl.practitioners.controllers.edit_practitioner",["$scope",function ($scope) {
        $scope.path = [
            {
                name: "CHUS",
                route: "practitioners"
            },{
                name: "Edit CHU",
                route: "edit_practitioners"
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
                func : "ui-sref='practitioners.new_practitioner'",
                class: "action-btn action-btn-primary action-btn-md",
                color: "green",
                tipmsg: "New CHU",
                icon: "fa-plus"
            }
        ];
    }]);
