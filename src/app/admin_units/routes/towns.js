"use strict";
(function(angular){
    angular.module("mfl.admin_units.routes.towns", ["mfl.admin_units.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("admin_units.towns", {
                url: "/towns",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.towns",
                        templateUrl: "admin_units/tpls/towns/towns.tpl.html"
                    }
                }
            });
    }]);
})(angular);

