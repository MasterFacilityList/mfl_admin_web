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
                        templateUrl: "setup/tpls/dashboard/main.tpl.html"
                    },
                    "header@setup": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "sidebar@setup": {
                        templateUrl: "users/tpls/side_nav.tpl.html"
                    },
                    "main-content@setup": {
                        controller: "mfl.setup.controller.dashboard",
                        templateUrl: "setup/tpls/dashboard/index.tpl.html"
                    }
                },
                data : { pageTitle: "System Setup"}
            });
    }]);
})(angular);
