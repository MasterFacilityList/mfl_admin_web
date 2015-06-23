(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.dashboard", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup", {
                url: "/setup",
                views: {
                    "main": {
                        controller: "mfl.setup.controller.dashboard",
                        templateUrl: "common/tpls/main.tpl.html"
                    },
                    "header@setup": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    }
                },
                data : { pageTitle: "System Setup"},
                redirectTo: "setup.towns"
            });
    }]);
})(angular);
