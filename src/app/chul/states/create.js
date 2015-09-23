(function (angular) {
    "use strict";

    angular.module("mfl.chul.states.create", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("community_units.create_unit", {
            url: "create/?furthest",
            views: {
                "main-content@chul": {
                    templateUrl: "chul/tpls/chul_create.tpl.html",
                    controller: "mfl.chul.controllers.create_chul"
                }
            },
            redirectTo: "community_units.create_unit.basic",
            permission: "chul.add_communityhealthunit"
        })
        .state("community_units.create_unit.basic", {
            url: "basic/:unit_id",
            views: {
                "tab-header@community_units.create_unit": {
                    templateUrl: "chul/tpls/chul_create.tab-headers.tpl.html"
                },
                "form-view@community_units.create_unit": {
                    templateUrl: "chul/tpls/chul_basic.tpl.html",
                    controller: "mfl.chul.controllers.edit_chul.basic"
                }
            },
            permission: "chul.add_communityhealthunit"
        })
        .state("community_units.create_unit.chews", {
            url: ":unit_id/chews/",
            views: {
                "tab-header@community_units.create_unit": {
                    templateUrl: "chul/tpls/chul_create.tab-headers.tpl.html"
                },
                "form-view@community_units.create_unit": {
                    templateUrl: "chul/tpls/chul_chews.tpl.html",
                    controller: "mfl.chul.controllers.edit_chul.chews"
                }
            },
            permission: "chul.add_communityhealthunit"
        });
    }]);

})(window.angular);
