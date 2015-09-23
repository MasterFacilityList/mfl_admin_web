(function (angular) {
    "use strict";

    angular.module("mfl.chul.states.base", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("chul", {
            url: "/chul_management",
            views: {
                "main": {
                    templateUrl: "common/tpls/main.tpl.html"
                },
                "header@chul": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@chul" : {
                    templateUrl : "chul/tpls/body.tpl.html"
                }
            },
            data : { pageTitle: "CHUL Management" },
            redirectTo: "community_units",
            permission: "chul.view_communityhealthunit"
        });
    }]);

})(window.angular);
