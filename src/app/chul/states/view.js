(function (angular) {
    "use strict";

    angular.module("mfl.chul.states.view", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("community_units.view_unit", {
                url: "view/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_view.tpl.html",
                        controller: "mfl.chul.controllers.view_chul"
                    }
                },
                permission: "chul.view_communityhealthunit"
            })
            .state("community_units.approve_reject", {
                url: "chul_approve_reject/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl: "chul/tpls/chul_approve_reject.view.tpl.html",
                        controller: "mfl.chul.controllers.approve_reject"
                    }
                },
                permission: "chul.change_communityhealthunit"
            });
    }]);

})(window.angular);
