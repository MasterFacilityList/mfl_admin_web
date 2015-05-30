(function (angular) {
    "use strict";
    angular.module("mfl.facilities.states", [
        "ui.router"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities", {
            url: "/facilities",
            views: {
                "main": {
                    templateUrl: "facilities/tpls/main.tpl.html"
                },
                "header@facilities": {
                    controller: "mfl.users.controllers.home",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "sidebar@facilities": {
                    templateUrl: "facilities/tpls/sidebar.tpl.html"
                },
                "content@facilities": {
                    templateUrl: "facilities/tpls/content.tpl.html"
                }
            },
            data : { pageTitle: "Facility Management" }
        })
        .state("facilities.list", {
            url: "/list",
            views: {
                "content@facilities": {
                    templateUrl: "facilities/tpls/facilities-grid.tpl.html"
                }
            },
            data : { pageTitle: "Facility Management" }
        });
    }]);
})(angular);
