(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.counties", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.counties", {
                url: "/counties",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.counties": {
                        controller: "mfl.setup.controller.county.list",
                        templateUrl: "setup/tpls/counties/counties.tpl.html"
                    }
                }
            })
            .state("setup.counties.view_consts", {
                url: "/constituencies/:count_id",
                views: {
                    "main-content@setup": {
                        templateUrl: "setups/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            })
            ;
    }]);

})(angular);
