(function (angular) {

    "use strict";

    angular.module("mfl.reports.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("reports", {
            url: "/reports/",
            views: {
                "main": {
                    templateUrl: "common/tpls/main.tpl.html"
                },
                "body@reports" : {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "header@reports": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                }
            },
            redirectTo:"reports.list"
        })
        .state("reports.list", {
            url: "facilities/",
            views: {
                "body@reports": {
                    templateUrl: "reports/tpls/body.tpl.html"
                },
                "main-content@reports.list": {
                    templateUrl: "reports/tpls/facilities.grid.tpl.html",
                    controller: "mfl.reports.controllers.facilities"
                }
            }
        });

    }]);

})(window.angular);
