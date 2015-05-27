"use strict";
(function(angular){
    angular.module("mfl.setup.routes.counties", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.counties", {
                url: "/counties",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.county.list",
                        templateUrl: "setup/tpls/counties/counties.tpl.html"
                    }
                }
            })
            .state("setup.counties.view_consts", {
                url: "/constituencies/:count_id",
                views: {
                    "main-content@setup": {
                        templateUrl: "setups/tpls/constituencies/constituencies.tpl.html",
                        controller: "mfl.setup.controller.county.constituency"
                    }
                }
            })
            ;
    }]);

})(angular);
