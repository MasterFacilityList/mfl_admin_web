"use strict";
(function(angular){
    angular.module("mfl.setup.routes.constituencies", ["mfl.setup.routes.dashboard"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.constituencies", {
                url: "/constituencies",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.constituency.list",
                        templateUrl: "setup/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            })
            .state("setup.constituencies.view_wards", {
                url: "/wards/:const_id",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.constituency.wards",
                        templateUrl: "setup/tpls/wards/wards.tpl.html"
                    }
                }
            })
            .state("setup.constituencies.edit", {
                url: "/edit/:const_id",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.constituency.list",
                        templateUrl: "admin_units/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            });
    }]);

})(angular);
