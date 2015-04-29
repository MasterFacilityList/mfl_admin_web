"use strict";

angular.module("mfl.chus.routes", [])

.config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state("chus", {
            url: "/chus",
            views: {
                "main": {
                    controller: "mfl.chus.controllers.chus",
                    templateUrl: "home/tpls/main.tpl.html"
                },
                "header@chus": {
                    controller: "mfl.home.controllers.home",
                    templateUrl: "home/tpls/header.tpl.html"
                },
                "sidebar@chus": {
                    templateUrl: "home/tpls/side_nav.tpl.html"
                },
                "main-content@chus": {
                    controller: "mfl.chus.controllers.chus",
                    templateUrl: "chus/tpls/index.tpl.html"
                }
            },
            data: {
                pageTitle: "chus"
            }
        })
        .state("chus.new_chu", {
            url: "/newchu",
            views: {
                "main-content@chus": {
                    controller: "mfl.chus.controllers.new_chu",
                    templateUrl: "chus/tpls/new_chu.tpl.html"
                }
            }
        })
        .state("chus.edit_chu", {
            url: "/editchu/:fac_id",
            views: {
                "main-content@chus": {
                    controller: "mfl.chus.controllers.edit_chu",
                    templateUrl: "chus/tpls/new_chu.tpl.html"
                }
            }
        })
        .state("chus.service_action", {
            url: "/processservice/:fac_id",
            views: {
                "main-content@chus": {
                    controller: "mfl.chus.controllers.chusaction",
                    templateUrl: "chus/tpls/chus_action.tpl.html"
                }
            }
        });
}]);