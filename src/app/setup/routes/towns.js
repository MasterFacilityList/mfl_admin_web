(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.towns", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.towns", {
                url: "/towns",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.town.list",
                        templateUrl: "setup/tpls/towns/towns.tpl.html"
                    }
                }
            });
    }]);
})(angular);

