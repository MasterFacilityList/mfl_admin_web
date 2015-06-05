(function (angular) {
    "use strict";

    angular.module("mfl.common.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("common_404", {
                url: "/404/?from",
                "main@common_404": {
                    templateUrl: "common/tpls/404.tpl.html",
                    controller: "mfl.common.controllers.404"
                },
                "header@common_404": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                }
            });
    }]);

})(angular);
