(function (angular) {
    "use strict";
    angular.module("mfl.facilities.base", [
        "ui.router"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities", {
            url: "/facilities",
            views: {
                "main": {
                    templateUrl: "facilities/tpls/common/main.tpl.html"
                },
                "header@facilities": {
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "sidebar@facilities": {
                    templateUrl: "facilities/tpls/common/sidebar.tpl.html"
                },
                "main-content@facilities": {
                    templateUrl: "facilities/tpls/grid/index.tpl.html",
                    controller: "mfl.facilities.controllers.home.list"
                }
            },
            data : { pageTitle: "Facility Management" }
        });
    }]);
})(angular);
