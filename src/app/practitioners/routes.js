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
        .state("practitioners.new_chu", {
            url: "/newpractitioner",
            views: {
                "main-content@practitioners": {
                    controller: "mfl.practitioners.controllers.new_chu",
                    templateUrl: "practitioners/tpls/new_chu.tpl.html"
                }
            }
        })
        .state("practitioners.edit_chu", {
            url: "/editpractitioner/:fac_id",
            views: {
                "main-content@practitioners": {
                    controller: "mfl.practitioners.controllers.edit_chu",
                    templateUrl: "practitioners/tpls/new_chu.tpl.html"
                }
            }
        });
}]);