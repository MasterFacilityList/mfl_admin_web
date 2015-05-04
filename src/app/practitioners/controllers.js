"use strict";

angular.module("mfl.practitioners.controllers", ["mfl.practitioners.wrapper"])

    .controller("mfl.practitioners.controllers.practitioners", ["$scope",
     function ($scope) {
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
    }])
    .controller("mfl.practitioners.controllers.new_prac",["$scope",function ($scope) {
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
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.practitioners.controllers.edit_prac",["$scope", "$stateParams",
        "practitionersApi",function ($scope,$stateParams,practitionerApi) {
            practitionerApi.api.get($stateParams.prac_id).success(function(data){
                console.log(data);
            })
            .error(function(error){
                console.log(error);
            });
            $scope.path = [
                {
                    name: "Practitioners",
                    route: "practitioners"
                },{
                    name: "Edit Practitioner",
                    route: "edit_prac"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-sitemap",
                    name: "Edit Practitioner"
                }
            ];
            $scope.action = [
                {
                    func : "",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Save",
                    icon: "fa-save"
                },
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
        }])
    .controller("mfl.practitioners.controllers.view_prac",["$scope", "$stateParams",
        "practitionersApi",function ($scope,$stateParams,practitionerApi) {
            practitionerApi.api.get($stateParams.prac_id).success(function(data){
                console.log(data);
            })
            .error(function(error){
                console.log(error);
            });
            $scope.path = [
                {
                    name: "Practitioners",
                    route: "practitioners"
                },{
                    name: "View Practitioner",
                    route: "view_prac"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-eye",
                    name: "View Practitioner"
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
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
        }]);
