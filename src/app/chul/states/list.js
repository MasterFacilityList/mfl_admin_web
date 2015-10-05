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
                    controller: "mfl.chul.controllers.units_approved_list"
                }
            },
            permission: "chul.view_communityhealthunit"
        })
        .state("chu_pending_approvals", {
            parent: "chul",
            url: "^/chul_pending_approvals/",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul_pending_approval.grid.tpl.html",
                    controller: "mfl.chul.controllers.units_pending_approvals"
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
                    controller: "mfl.chul.controllers.units_rejected_list"
                }
            },
            permission: "chul.view_communityhealthunit"
        })
        .state("chu_feedback", {
            parent: "chul",
            url: "^/chu_feedback/?chu&facility_id",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul_feedback.grid.tpl.html",
                    controller: "mfl.chul.controllers.chu_feedback"
                }
            },
            permission: "chul.view_churating"
        });
    }]);

})(window.angular);
