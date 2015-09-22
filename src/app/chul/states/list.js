(function (angular) {
    "use strict";

    angular.module("mfl.chul.states.list", [
        "ui.router"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("community_units", {
            parent: "chul",
            url: "^/chul_list/",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul.grid.tpl.html",
                    controller: "mfl.chul.controllers.units_list"
                }
            },
            permission: "chul.view_communityhealthunit"
        })
        .state("chu_approve_list", {
            parent: "chul",
            url: "^/chu_approve_list/",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul_approve.grid.tpl.html",
                    controller: "mfl.chul.controllers.units_list"
                }
            },
            permission: "chul.view_communityhealthunit"
        })
        .state("chu_approved_recently", {
            parent: "chul",
            url: "^/chu_approved_recently/",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul_approved_recently.grid.tpl.html",
                    controller: "mfl.chul.controllers.units_list"
                }
            },
            permission: "chul.view_communityhealthunit"
        })
        .state("chu_reject_list", {
            parent: "chul",
            url: "^/chu_reject_list/",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul_rejected.grid.tpl.html",
                    controller: "mfl.chul.controllers.units_list"
                }
            },
            permission: "chul.view_communityhealthunit"
        });
    }]);

})(window.angular);
