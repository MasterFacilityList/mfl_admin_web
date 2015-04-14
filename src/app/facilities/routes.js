"use strict";

angular.module("mfl.facilities.routes",[])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("facilities", {
                url: "/facilities",
                views: {
                    "main": {
                        controller: "mfl.facilities.controllers.facilities",
                        templateUrl: "home/tpls/main.tpl.html"
                    },
                    "header@facilities": {
                        controller: "mfl.home.controllers.home",
                        templateUrl: "home/tpls/header.tpl.html"
                    },
                    "sidebar@facilities": {
                        templateUrl: "home/tpls/side_nav.tpl.html"
                    },
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.facilities",
                        templateUrl: "facilities/tpls/index.tpl.html"
                    }
                },
                data : { pageTitle: "Facilities" }
            })
            .state("facilities.new_owner", {
                url: "/newowner",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.new_owner",
                        templateUrl: "facilities/tpls/new_owner.tpl.html"
                    }
                }
            })
            .state("facilities.new_facility", {
                url: "/newfacility",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.new_facility",
                        templateUrl: "facilities/tpls/new_facility.tpl.html"
                    }
                }
            })
            .state("facilities.edit_facility", {
                url: "/editfacility/:fac_id",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.edit_facility",
                        templateUrl: "facilities/tpls/new_facility.tpl.html"
                    }
                }
            })
            .state("facilities.facility_action", {
                url: "/processfacility/:fac_id",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.facilitiesaction",
                        templateUrl: "facilities/tpls/facilities_action.tpl.html"
                    }
                }
            });
    }]);
