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
        })
        .state("facilities_view.approve", {
                url: "/approve/",
                views: {
                    "main-content@facilities_view" : {
                        templateUrl : "facilities/tpls/view/approve.tpl.html",
                        controller: "mfl.facilities.controllers.view.approve"
                    }
                }
            })
        .state("facilities_view.add_unit", {
                url: "/add_unit/",
                views: {
                    "main-content@facilities_view" : {
                        templateUrl : "facilities/tpls/view/add_unit.tpl.html",
                        controller: "mfl.facilities.controllers.view.add_unit"
                    }
                }
            })

        .state("facilities_view.upgrade", {
                url: "/upgrade/",
                views: {
                    "main-content@facilities_view" : {
                        templateUrl : "facilities/tpls/view/upgrade.tpl.html",
                        controller: "mfl.facilities.controllers.view.upgrade"
                    }
                }
            })

        .state("facilities_view.mutate_op_status", {
                url: "/mutate_op_status/",
                views: {
                    "main-content@facilities_view" : {
                        templateUrl : "facilities/tpls/view/mutate_op_status.tpl.html",
                        controller: "mfl.facilities.controllers.view.mutate_op_status"
                    }
                }
            })
        ;
    }]);
})(angular);
