(function (angular) {

    "use strict";

    angular.module("mfl.common.states", [
    ])

    .config(["$stateProvider",
        function ($stateProvider) {
            $stateProvider.state("common_403", {
                url: "/403",
                views: {
                    "main": {
                        templateUrl: "common/tpls/main.tpl.html"
                    },
                    "header@common_403": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "body@common_403": {
                        templateUrl: "common/tpls/403.tpl.html"
                    }
                }
            });
        }
    ]);

})(angular);
