(function (angular) {
    "use strict";
    angular.module("mfl.facilities.create", [
        "ui.router",
        "mfl.facilities.base"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.create", {
            url: "/create",
            views: {
                "main-content@facilities": {
                    templateUrl: "facilities/tpls/create/basic.tpl.html",
                    controller: "mfl.facilities.controllers.create.basic"
                }
            },
            data : { pageTitle: "Facility Management" }
        });
    }]);
})(angular);
