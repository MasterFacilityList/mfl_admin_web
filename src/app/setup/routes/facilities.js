(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.facilities", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.facility_owners", {
                url: "/facility_owners",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_owners": {
                        controller: "mfl.setup.controller.facilityOwner.list",
                        templateUrl: "setup/tpls/facilities/owners/facility-owners-list.tpl.html"
                    }
                }
            })

        .state("setup.facility_owners.view", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_owners": {
                        controller: "mfl.setup.controller.facilityOwner.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owners-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_owners.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_owners": {
                        controller: "mfl.setup.controller.facilityOwner.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owners-view.tpl.html"
                    }
                }
            })

        /** -----------------------------------------------------------**/
        .state("setup.facility_owner_types", {
                url: "/facility_owners_types",
                views: {
                    "body@setup" : {
                        "templateUrl" : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_owner_types": {
                        controller: "mfl.setup.controller.facilityOwnerType.list",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owner-types-list.tpl.html"
                    }
                }
            })

        .state("setup.facility_owner_types.view", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_owner_types": {
                        controller: "mfl.setup.controller.facilityOwnerType.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owner-types-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_owner_types.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_owner_types": {
                        controller: "mfl.setup.controller.facilityOwnerType.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owner-types-view.tpl.html"
                    }
                }
            })

         /** -----------------------------------------------------------**/
        .state("setup.facility_job_titles", {
                url: "/facility_job_titles",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityJobTitle.list",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-list.tpl.html"
                    }
                }
            })

        .state("setup.facility_job_titles.view", {
                url: "/:id",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_job_titles.create", {
                url: "/create",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-view.tpl.html"
                    }
                }
            })

         /** -----------------------------------------------------------**/

        .state("setup.facility_regulatory_bodies", {
                url: "/facility_regulatory_bodies",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.list",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-list.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.view", {
                url: "/:id",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.view",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.create", {
                url: "/create",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.view",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-view.tpl.html"
                    }
                }
            });
    }]);
})(angular);

