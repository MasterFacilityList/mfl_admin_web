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
            .state("facilities.manage_facilities", {
                url: "/managefacilities",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.manage_facilities",
                        templateUrl: "facilities/tpls/manage_facilities.tpl.html"
                    }
                }
            })
            .state("facilities.manage_owners", {
                url: "/manageowners",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.manage_owners",
                        templateUrl: "facilities/tpls/manage_owners.tpl.html"
                    }
                }
            }).state("facilities.manage_services", {
                url: "/manageservices",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.services",
                        templateUrl: "facilities/tpls/manage_services.tpl.html"
                    }
                }
            })
            .state("facilities.new_service", {
                url: "/newservice",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.new_service",
                        templateUrl: "services/tpls/new_service.tpl.html"
                    }
                }
            })
            .state("facilities.edit_service", {
                url: "/editservice/:service_id",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.edit_service",
                        templateUrl: "services/tpls/new_service.tpl.html"
                    }
                }
            })
            .state("facilities.view_service", {
                url: "/viewservice/:service_id",
                views: {
                    "main-content@facilities": {
                        controller: "mfl.facilities.controllers.view_service",
                        templateUrl: "services/tpls/view_service.tpl.html"
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
