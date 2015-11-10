(function (angular) {
    "use strict";

    angular.module("mfl.chul.states.approve", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("community_units.approve_reject", {
                url: "chul_approve_reject/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_approve_reject.view.tpl.html",
                        controller: "mfl.chul.controllers.approve_reject"
                    }
                },
                permission: "chul.view_communityhealthunit,chul.can_approve_chu"
            })
            .state("chu_approve_list.approve_view_unit", {
                url: "approve_view/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_approve_reject.detail.tpl.html",
                        controller: "mfl.chul.controllers.view_chul"
                    },
                    "header-buttons@chu_approve_list.approve_view_unit" : {
                        templateUrl: "chul/tpls/chul_approve_btns.tpl.html",
                        controller: "mfl.chul.controllers.view_chul"
                    }
                },
                permission: "chul.view_communityhealthunit"
            })
            .state("chu_reject_list.reject_view_unit", {
                url: "reject_view/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_approve_reject.detail.tpl.html",
                        controller: "mfl.chul.controllers.view_chul"
                    }
                },
                permission: "chul.view_communityhealthunit"
            })
            .state("chu_approve_list.approved", {
                url: "approved/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_approve_reject.view.tpl.html",
                        controller: "mfl.chul.controllers.approve_reject"
                    }
                },
                permission: "chul.view_communityhealthunit,chul.can_approve_chu"
            })
            .state("chu_pending_approvals.view", {
                url: "pending_approval/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_pending_approval.view.tpl.html",
                        controller: "mfl.chul.controllers.approve_reject"
                    },
                    "print-btn@chu_pending_approvals.view" : {
                        templateUrl : "chul/tpls/chul_print_button.tpl.html",
                        controller: "mfl.chul.controllers.view_chul"
                    }
                },
                permission: "chul.view_communityhealthunit"
            })
            .state("chu_reject_list.rejected", {
                url: "rejected/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_approve_reject.view.tpl.html",
                        controller: "mfl.chul.controllers.approve_reject"
                    }
                },
                permission: "chul.view_communityhealthunit,chul.can_approve_chu"
            });
    }]);

})(window.angular);
