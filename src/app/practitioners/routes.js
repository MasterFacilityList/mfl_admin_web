"use strict";

angular.module("mfl.practitioners.routes", [])

.config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state("practitioners", {
            url: "/practitioners",
            views: {
                "main": {
                    controller: "mfl.practitioners.controllers.practitioners",
                    templateUrl: "home/tpls/main.tpl.html"
                },
                "header@practitioners": {
                    controller: "mfl.home.controllers.home",
                    templateUrl: "home/tpls/header.tpl.html"
                },
                "sidebar@practitioners": {
                    templateUrl: "home/tpls/side_nav.tpl.html"
                },
                "main-content@practitioners": {
                    controller: "mfl.practitioners.controllers.practitioners",
                    templateUrl: "practitioners/tpls/index.tpl.html"
                }
            },
            data: {
                pageTitle: "practitioners"
            }
        })
        .state("practitioners.new_prac", {
            url: "/newprac",
            views: {
                "main-content@practitioners": {
                    controller: "mfl.practitioners.controllers.new_prac",
                    templateUrl: "practitioners/tpls/new_prac.tpl.html"
                }
            }
        })
        .state("practitioners.edit_prac", {
            url: "/editprac/:prac_id",
            views: {
                "main-content@practitioners": {
                    controller: "mfl.practitioners.controllers.edit_prac",
                    templateUrl: "practitioners/tpls/new_prac.tpl.html"
                }
            }
        })
        .state("practitioners.view_prac", {
            url: "/view/:prac_id",
            views: {
                "main-content@practitioners": {
                    controller: "mfl.practitioners.controllers.view_prac",
                    templateUrl: "practitioners/tpls/new_prac.tpl.html"
                }
            }
        });
}]);