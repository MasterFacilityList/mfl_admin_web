"use strict";
(function(angular){
    angular.module("mfl.setup.routes.facilities", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.facility_owners", {
                url: "/facility_owners",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityOwner.list",
                        templateUrl: "setup/tpls/facilities/owners/facility-owners-list.tpl.html"
                    }
                }
            })

        .state("setup.facility_owner_types", {
                url: "/facility_owners_types",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityOwnerType.list",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owner-types-list.tpl.html"
                    }
                }
            })
        .state("setup.facility_job_titles", {
                url: "/facility_job_titles",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityJobTitle.list",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-list.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies", {
                url: "/facility_regulatory_bodies",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.list",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-list.tpl.html"
                    }
                }
            });
    }]);
})(angular);

