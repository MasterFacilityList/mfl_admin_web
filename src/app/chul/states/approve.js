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
                permission: "chul.chul.can_approve_chu"
            });
    }]);

})(window.angular);
