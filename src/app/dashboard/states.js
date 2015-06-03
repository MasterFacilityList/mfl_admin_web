(function (angular) {

    "use strict";

    angular.module("mfl.dashboard.states", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("dashboard", {
                url: "/dashboard",
                views: {
                    "main": {
                        controller: "mfl.dashboard.home",
                        templateUrl: "dashboard/tpls/main.tpl.html"
                    },
                    "header@dashboard": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "main-content@dashboard": {
                        controller: "mfl.dashboard.content",
                        templateUrl: "dashboard/tpls/content.tpl.html"
                    }
                },
                data : { pageTitle: "Dashboard" }
            });
    }]);

})(angular);
