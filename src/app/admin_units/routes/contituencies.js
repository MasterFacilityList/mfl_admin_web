"use strict";
(function(angular){
    angular.module("mfl.admin_units.routes.constituencies", ["mfl.admin_units.routes.dashboard"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("admin_units.constituencies", {
                url: "/constituencies",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.constituencies",
                        templateUrl: "admin_units/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            })
            .state("admin_units.constituencies.view_wards", {
                url: "/wards/:const_id",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.constituencies.wards",
                        templateUrl: "admin_units/tpls/wards/wards.tpl.html"
                    }
                }
            })
            .state("admin_units.constituencies.edit", {
                url: "/edit/:const_id",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.constituencies",
                        templateUrl: "admin_units/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            });
    }]);

})(angular);
