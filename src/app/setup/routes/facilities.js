(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.facilities", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.rating_comments", {
                url: "/rating_comments",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.rating_comments": {
                        templateUrl: "setup/tpls/facilities/rating_comments" +
                                     "/rating_comments.grid.tpl.html"
                    }
                },
                permission: "facilities.view_owner",
                userFeature: "is_staff,is_national"
            })

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
                },
                permission: "facilities.view_owner",
                userFeature: "is_staff,is_national"
            })

        .state("setup.facility_owners.view", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_owners": {
                        controller: "mfl.setup.controller.facilityOwner.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owners-view.tpl.html"
                    }
                },
                permission: "facilities.view_owner",
                userFeature: "is_staff,is_national"
            })
            .state("setup.facility_owners.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_owners.view": {
                        controller: "mfl.setup.controller.facilityOwner.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_owners.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_owners": {
                        controller: "mfl.setup.controller.facilityOwner.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owners-view.tpl.html"
                    }
                },
                permission: "facilities.add_owner",
                userFeature: "is_staff,is_national"
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
                },
                permission: "facilities.view_ownertype",
                userFeature: "is_staff,is_national"
            })

        .state("setup.facility_owner_types.view", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_owner_types": {
                        controller: "mfl.setup.controller.facilityOwnerType.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owner-types-view.tpl.html"
                    }
                },
                permission: "facilities.view_ownertype",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_owner_types.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_owner_types.view": {
                        controller: "mfl.setup.controller.facilityOwnerType.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "facilities.delete_ownertype",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_owner_types.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_owner_types": {
                        controller: "mfl.setup.controller.facilityOwnerType.view",
                        templateUrl: "setup/tpls/facilities/owners/"+
                                        "facility-owner-types-view.tpl.html"
                    }
                },
                permission: "facilities.add_ownertype",
                userFeature: "is_staff,is_national"
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
                },
                permission: "facilities.view_jobtitle",
                userFeature: "is_staff,is_national"
            })

        .state("setup.facility_job_titles.view", {
                url: "/:id",
                views: {
                    "main-content@setup.facility_job_titles": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-view.tpl.html"
                    }
                },
                permission: "facilities.view_jobtitle",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_job_titles.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_job_titles.view": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "facilities.delete_jobtitle",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_job_titles.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_job_titles": {
                        controller: "mfl.setup.controller.facilityJobTitle.view",
                        templateUrl: "setup/tpls/facilities/job_titles/job-titles-view.tpl.html"
                    }
                },
                permission: "facilities.add_jobtitle",
                userFeature: "is_staff,is_national"
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
                },
                permission: "facilities.view_regulatingbody",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_regulatory_bodies.edit", {
                url: "/:id/edit",
                views: {
                    "main-content@setup.facility_regulatory_bodies": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.edit",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-view.tpl.html"
                    }
                },
                permission: "facilities.view_regulatingbody",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_regulatory_bodies.edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_regulatory_bodies.edit": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.edit",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "facilities.delete_regulatingbody",
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_regulatory_bodies.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_regulatory_bodies": {
                        controller: "mfl.setup.controller.facilityRegulatoryBody.edit",
                        templateUrl: "setup/tpls/facilities/regulatory_bodies/"+
                                    "regulatory-bodies-view.tpl.html"
                    }
                },
                permission: "facilities.add_regulatingbody",
                userFeature: "is_staff,is_national"
            })

         /** -----------------------------------------------------------**/

        .state("setup.facility_reasons", {
                url: "/facility_reasons",
                views: {
                    "body@setup" : {
                        "templateUrl" : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_reasons": {
                        templateUrl: "setup/tpls/facilities/reasons/"+
                        "reasons-list.tpl.html",
                        controller:"mfl.setup.controller.change_reasons.list"
                    }
                },
                userFeature: "is_national,is_staff"
            })
        .state("setup.facility_reasons.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_reasons": {
                        templateUrl: "setup/tpls/facilities/reasons/"+
                        "reasons-view.tpl.html",
                        controller:"mfl.setup.controller.change_reasons.view"
                    }
                },
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_reasons.edit", {
                url: "/edit/:reason_id",
                views: {
                    "main-content@setup.facility_reasons": {
                        templateUrl: "setup/tpls/facilities/reasons/"+
                        "reasons-view.tpl.html",
                        controller:"mfl.setup.controller.change_reasons.view"
                    }
                },
                userFeature: "is_national,is_staff"
            })
        .state("setup.facility_reasons.edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_reasons.edit": {
                        controller:"mfl.setup.controller.change_reasons.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                userFeature: "is_national,is_staff"
            })



         /** -----------------------------------------------------------**/

        .state("setup.facility_depts", {
                url: "/facility_depts",
                views: {
                    "body@setup" : {
                        "templateUrl" : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_depts": {
                        templateUrl: "setup/tpls/facilities/depts/depts-list.tpl.html",
                        controller:"mfl.setup.controller.facility_depts.view"
                    }
                },
                userFeature: "is_national,is_staff"
            })
        .state("setup.facility_depts.create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_depts": {
                        templateUrl: "setup/tpls/facilities/depts/depts-view.tpl.html",
                        controller:"mfl.setup.controller.facility_depts.view"
                    }
                },
                userFeature: "is_staff,is_national"
            })
        .state("setup.facility_depts.edit", {
                url: "/edit/:dept_id",
                views: {
                    "main-content@setup.facility_depts": {
                        templateUrl: "setup/tpls/facilities/depts/depts-view.tpl.html",
                        controller:"mfl.setup.controller.facility_depts.view"
                    }
                },
                userFeature: "is_national,is_staff"
            })
        .state("setup.facility_depts.edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_depts.edit": {
                        controller:"mfl.setup.controller.facility_depts.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                userFeature: "is_national,is_staff"
            });
    }]);
})(window.angular);
