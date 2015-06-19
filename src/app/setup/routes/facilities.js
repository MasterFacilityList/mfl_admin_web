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
            .state("setup.facility_owners.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_owners.view": {
                        controller: "mfl.setup.controller.facilityOwner.view",
                        templateUrl: "common/tpls/delete.tpl.html"
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
        .state("setup.facility_owner_types.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_owner_types.view": {
                        controller: "mfl.setup.controller.facilityOwnerType.view",
                        templateUrl: "common/tpls/delete.tpl.html"
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
                    "body@setup" : {
                        "templateUrl" : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_job_titles": {
                        controller: "mfl.setup.controller.facilityJobTitle.list",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-list.tpl.html"
                    }
                }
            })

        .state("setup.facility_job_titles.view", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_job_titles": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_job_titles.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_job_titles.view": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                }
            })
        .state("setup.facility_job_titles.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_job_titles": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-view.tpl.html"
                    }
                }
            })

         /** -----------------------------------------------------------**/

        .state("setup.facility_regulatory_bodies", {
                url: "/facility_regulatory_bodies",
                views: {
                    "body@setup" : {
                        "templateUrl" : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_regulatory_bodies": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.list",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-list.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.edit", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_regulatory_bodies": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.edit",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_regulatory_bodies.edit": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.edit",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.edit.basic", {
                url: "/basicdetails",
                views: {
                    "form-view@setup.facility_regulatory_bodies.edit" : {
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/" +
                        "regulatory-body-main-form.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.edit.contacts", {
                url: "/contacts",
                views: {
                    "form-view@setup.facility_regulatory_bodies.edit" : {
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/" +
                        "regulatory-body-contacts-form.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_regulatory_bodies": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.create",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-view.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.create.basic", {
                url: "/basicdetails",
                views: {
                    "form-view@setup.facility_regulatory_bodies.create" : {
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/" +
                        "regulatory-body-main-form.tpl.html"
                    }
                }
            })
        .state("setup.facility_regulatory_bodies.create.contacts", {
                url: "/:reg_cont_id/contacts",
                views: {
                    "form-view@setup.facility_regulatory_bodies.create" : {
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/" +
                        "regulatory-body-contacts-form.tpl.html"
                    }
                }
            });
    }]);
})(angular);

