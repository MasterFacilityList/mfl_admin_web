(function (angular) {
    "use strict";
    angular.module("mfl.facilities.view", [
        "ui.router",
        "mfl.facilities.base"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.view", {
            url: "/view/:facilityId",
            views: {
                "main-content@facilities": {
                    templateUrl: "facilities/tpls/view/view.tpl.html",
                    controller: "mfl.facilities.controllers.view.base"
                }
            },
            data : { pageTitle: "Facility Management" }
        });
    }]);
})(angular);
