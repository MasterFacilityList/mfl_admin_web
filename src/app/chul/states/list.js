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
        });
    }]);

})(window.angular);
