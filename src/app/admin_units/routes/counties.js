"use strict";
(function(angular){
    angular.module("mfl.admin_units.routes.counties", ["mfl.admin_units.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("admin_units.counties", {
                url: "/counties",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.counties",
                        templateUrl: "admin_units/tpls/counties/counties.tpl.html"
                    }
                }
            })
            .state("admin_units.counties.view_consts", {
                url: "/constituencies/:count_id",
                views: {
                    "main-content@admin_units": {
                        templateUrl: "admin_units/tpls/constituencies/constituencies.tpl.html",
                        controller: "mfl.admin_units.controllers.counties.consts"
                    }
                }
            })
            ;
    }]);

})(angular);
