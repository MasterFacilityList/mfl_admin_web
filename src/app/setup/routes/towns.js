(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.towns", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.towns", {
                url: "/towns",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.list",
                        templateUrl: "setup/tpls/towns/towns.tpl.html"
                    }
                }
            });
    }]);
})(angular);

