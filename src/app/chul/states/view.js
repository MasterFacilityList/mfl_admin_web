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
            .state("community_units.edit_unit", {
                url: "edit/:unit_id/",
                views: {
                    "main-content@chul": {
                        templateUrl : "chul/tpls/chul_edit.tpl.html",
                        controller: "mfl.chul.controllers.edit_chul"
                    }
                }
            })
            .state("community_units.edit_unit.basic", {
                url: "basic/",
                views: {
                    "form-view@community_units.edit_unit": {
                        templateUrl : "chul/tpls/chul_basic.tpl.html",
                        controller: "mfl.chul.controllers.edit_chul.basic"
                    }
                }
            })
            .state("community_units.edit_unit.chews", {
                url: "chews/",
                views: {
                    "form-view@community_units.edit_unit": {
                        templateUrl : "chul/tpls/chul_chews.tpl.html",
                        controller: "mfl.chul.controllers.edit_chul.chews"
                    }
                }
            });
    }]);

})(window.angular);
