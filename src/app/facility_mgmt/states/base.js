(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.base", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("facility_mgmt", {
            url: "/facility_mgmt",
            views: {
                "main": {
                    templateUrl: "common/tpls/main-no-sidenav.tpl.html"
                },
                "header@facility_mgmt": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@facility_mgmt" : {
                    templateUrl : "facility_mgmt/tpls/body.tpl.html"
                }
            },
            data : { pageTitle: "Facility Management" },
            redirectTo: "facilities",
            permission: "facilities.view_facility"
        });
    }]);

})(angular);
