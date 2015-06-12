(function (angular) {
    "use strict";
    angular.module("mfl.facilities.view", [
        "ui.router",
        "mfl.facilities.base"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.list.id", {
            url: "/:facilityId",
            views: {
                "main-content@facilities.list": {
                    templateUrl: "facilities/tpls/view/view.tpl.html",
                    controller: "mfl.facilities.controllers.view.base"
                },
                "header@facilities.list.id":{
                    templateUrl: "facilities/tpls/common/facility_nav.tpl.html"
                }
            },
            data : { pageTitle: "Facility Details" }
        })
        .state("facilities.list.id.view", {
            url: "/view/",
            views: {
                "main-content@facilities.list": {
                    templateUrl: "facilities/tpls/view/view.tpl.html",
                    controller: "mfl.facilities.controllers.view.base"
                },
                "header@facilities.list.id.view":{
                    templateUrl: "facilities/tpls/common/facility_nav.tpl.html"
                }
            },
            data : { pageTitle: "Facility Details" }
        })
        .state("facilities.list.id.approve", {
                url: "/approve/",
                views: {
                    "main-content@facilities.list" : {
                        templateUrl : "facilities/tpls/view/approve.tpl.html",
                        controller: "mfl.facilities.controllers.view.approve"
                    },
                    "header@facilities.list.id.approve":{
                        templateUrl: "facilities/tpls/common/facility_nav.tpl.html"
                    }
                }
            })
        .state("facilities.list.id.add_unit", {
                url: "/add_unit/",
                views: {
                    "main-content@facilities.list" : {
                        templateUrl : "facilities/tpls/view/add_unit.tpl.html",
                        controller: "mfl.facilities.controllers.view.add_unit"
                    },
                    "header@facilities.list.id.add_unit":{
                        templateUrl: "facilities/tpls/common/facility_nav.tpl.html"
                    }
                }
            })

        .state("facilities.list.id.upgrade", {
                url: "/upgrade/",
                views: {
                    "main-content@facilities.list" : {
                        templateUrl : "facilities/tpls/view/upgrade.tpl.html",
                        controller: "mfl.facilities.controllers.view.upgrade"
                    },
                    "header@facilities.list.id.upgrade":{
                        templateUrl: "facilities/tpls/common/facility_nav.tpl.html"
                    }
                }
            })

        .state("facilities.list.id.mutate_op_status", {
                url: "/mutate_op_status/",
                views: {
                    "main-content@facilities.list" : {
                        templateUrl : "facilities/tpls/view/mutate_op_status.tpl.html",
                        controller: "mfl.facilities.controllers.view.mutate_op_status"
                    },
                    "header@facilities.list.id.mutate_op_status":{
                        templateUrl: "facilities/tpls/common/facility_nav.tpl.html"
                    }
                }
            })
        ;
    }]);
})(angular);
