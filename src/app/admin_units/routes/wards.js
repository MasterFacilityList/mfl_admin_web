"use strict";
(function(angular){
    angular.module("mfl.admin_units.routes.wards", ["mfl.admin_units.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("admin_units.wards", {
                url: "/wards",
                views: {
                    "main-content@admin_units": {
                        controller: "mfl.admin_units.controllers.wards",
                        templateUrl: "admin_units/tpls/wards/wards.tpl.html"
                    }
                }
            });
    }]);
})(angular);
