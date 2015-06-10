(function (angular) {
    "use strict";
    angular.module("mfl.facilities.view", [
        "ui.router",
        "mfl.facilities.base"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities_view", {
            url: "/facility/:facilityId",
            views: {
                "main": {
                    templateUrl: "facilities/tpls/view/base.tpl.html"
                },
                "header@facilities_view": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "main-content@facilities_view": {
                    templateUrl: "facilities/tpls/view/view.tpl.html",
                    controller: "mfl.facilities.controllers.view.base"
                },
                "sidebar@facilities_view": {
                    templateUrl: "facilities/tpls/view/sidebar.tpl.html"
                }
            },
            data : { pageTitle: "Facility Details" }
        });
    }]);
})(angular);
