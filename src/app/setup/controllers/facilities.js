(function(angular, _){

    "use strict";

    angular.module("mfl.setup.facilities.controllers",[
        "mfl.setup.api"
    ])
    /**
        Facility OwnerTypes
    **/
    .controller("mfl.setup.controller.facilityOwnerType.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-dedent",
                name: "Manage Facility Owner Categories"
            };

            $scope.filters = {
                "fields": "id,name"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_owner_types.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.add_ownertype'",
                    class: "btn btn-primary",
                    tipmsg: "Add Facility Owner Category",
                    wording:"Add Facility Owner Category"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.facilityOwnerType.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes","toasty",
        function($scope, $state, $stateParams, adminApi, formChanges,toasty){
            $scope.facility_owner_type_id = $stateParams.id;
            $scope.wrapper = adminApi.facilityOwnerTypes;
            if(!_.isUndefined($stateParams.id) &&
                $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Owner Categories"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.facility_owner_types.view.delete'" +
                               " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.delete_ownertype'",
                        class: "btn btn-danger",
                        tipmsg: "Delete Facility Owner Category",
                        wording: "Delete"
                    }
                ];
                adminApi.facilityOwnerTypes.get($stateParams.id).success(function(data){
                    $scope.facilityOwnerTypes = data;
                    $scope.deleteText = $scope.facilityOwnerTypes.name;
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
                $scope.remove = function () {
                    adminApi.facilityOwnerTypes.remove($stateParams.id).success(function(){
                        toasty.success({
                            title: "Owner type delete",
                            msg: "Owner type has been deleted"
                        });
                        $state.go("setup.facility_owner_types",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                        $state.go("setup.facility_owner_types",{},{reload:true});
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_owner_types.view");
                };
            }
            if(!_.isUndefined($stateParams) && $stateParams.id === "create") {
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Facility Owner Categories"
                };
            }

            $scope.updateFacilityOwnerTypes = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.facilityOwnerTypes.update(id, changes).success(function(){
                        toasty.success({
                            title: "Owner type updated",
                            msg: "Owner type has been updated"
                        });
                        $state.go("setup.facility_owner_types");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }
            };

            $scope.createFacilityOwnerTypes = function(ownerType){
                adminApi.facilityOwnerTypes.create(ownerType).success(function(){
                    toasty.success({
                        title: "Owner type added",
                        msg: "Owner type has been added"
                    });
                    $state.go("setup.facility_owner_types");
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
            };
        }]
    )

    /**
        Facility Owners

    **/
    .controller("mfl.setup.controller.facilityOwner.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-user",
                name: "Manage Facility Owners"
            };
            $scope.filters = {
                "fields": "id,name,code,abbreviation,owner_type_name"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_owners.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.add_owner'",
                    class: "btn btn-primary",
                    tipmsg: "Add Facility Owner",
                    wording: "Add Facility Owner"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.facilityOwner.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes","toasty",
        function($scope, $state, $stateParams, adminApi, formChanges,toasty) {
            $scope.facility_owner_id = $stateParams.id;
            $scope.wrapper = adminApi.facilityOwners;

            if(!_.isUndefined($stateParams.id)&&
                $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Owner"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.facility_owners.view.delete'" +
                               " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.delete_owner'",
                        class: "btn btn-danger",
                        tipmsg: "Delete Facility Owner",
                        wording: "Delete"
                    }
                ];
                adminApi.facilityOwners.get($stateParams.id).success(function(data){
                    $scope.facilityOwners = data;
                    $scope.deleteText = $scope.facilityOwners.name;
                    $scope.$watch("facilityOwners.owner_type", function(id){
                        $scope.ownerType = _.findWhere(
                            $scope.ownerTypes, {id: id}
                        );
                    });

                    $scope.edit = true;
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
                $scope.remove = function () {
                    adminApi.facilityOwners.remove($stateParams.id).success(function(){
                        toasty.success({
                            title: "Owner deleted",
                            msg: "Owner has been deleted"
                        });
                        $state.go("setup.facility_owners",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                        $state.go("setup.facility_owners",{},{reload:true});
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_owners.view");
                };
            }
            if(!_.isUndefined($stateParams) && $stateParams.id === "create") {
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Facility Owner"
                };
            }

            adminApi.facilityOwnerTypes.list().success(function(ownerTypes){
                $scope.ownerTypes = ownerTypes.results;
            }).error(function(error){
                $scope.alert = error.error;
                $scope.errors = error;
            });


            $scope.updateFacilityOwner = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.facilityOwners.update(id, changes).success(function(){
                        toasty.success({
                            title: "Owner updated",
                            msg: "Owner has been updated"
                        });
                        $state.go("setup.facility_owners");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }
            };

            $scope.createFacilityOwner = function(owner){
                adminApi.facilityOwners.create(owner).success(function(){
                    toasty.success({
                        title: "Owner added",
                        msg: "Owner has been added"
                    });
                    $state.go("setup.facility_owners");
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
            };
        }]
    )

    /**
        Facility Job Title
    **/
    .controller("mfl.setup.controller.facilityJobTitle.list", ["$scope",
        function ($scope) {
            $scope.tooltip = {
                "title": "",
                "checked": false
            };
            $scope.title = {
                icon: "fa-list-alt",
                name: "Manage Job Titles"
            };

            $scope.filters = {
                "fields": "id,name"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_job_titles.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.add_jobtitle'",
                    class: "btn btn-primary",
                    tipmsg: "Add Job Title",
                    wording: "Add Job Title"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.facilityJobTitle.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes", "toasty",
        function($scope, $state, $stateParams, adminApi, formChanges, toasty){
            $scope.tooltip = {
                "title": "",
                "checked": false
            };

            if(!_.isUndefined($stateParams.id)  && $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Job Title"
                };
                $scope.edit_view = true;
                $scope.action = [
                    {
                        func : "ui-sref='setup.facility_job_titles.view.delete'" +
                               " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.delete_jobtitle'",
                        class: "btn btn-danger",
                        tipmsg: "Delete Facility Job Title",
                        wording: "Delete"
                    }
                ];
                $scope.wrapper = adminApi.facilityJobTitles;

                adminApi.facilityJobTitles.get($stateParams.id).success(function(data){
                    $scope.facilityJobTitles = data;
                    $scope.deleteText = $scope.facilityJobTitles.name;
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
                $scope.remove = function () {
                    adminApi.facilityJobTitles.remove($stateParams.id).success(function(){
                        toasty.success({
                            title: "Job title deleted",
                            msg: "Job title has been deleted"
                        });
                        $state.go("setup.facility_job_titles",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $state.go("setup.facility_job_titles",{},{reload:true});
                        $scope.errors = error;
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_job_titles.view");
                };
            }
            if(!_.isUndefined($stateParams) && $stateParams.id === "create") {
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Job Title"
                };
            }
            $scope.updateFacilityJobTitle = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.facilityJobTitles.update(id, changes).success(function(){
                        toasty.success({
                            title: "Job title updated",
                            msg: "Job title has been updated"
                        });
                        $state.go("setup.facility_job_titles");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }
            };
            $scope.createFacilityJobTitle = function(title){
                adminApi.facilityJobTitles.create(title).success(function(){
                    toasty.success({
                        title: "Job title added",
                        msg: "Job title has been added"
                    });
                    $state.go("setup.facility_job_titles");
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                });
            };
        }]
    )

    .controller("mfl.setup.controller.change_reasons.list",["$scope",
        function ($scope) {
            $scope.filters = {"fields":"id,reason,description"};
        }])

    .controller("mfl.setup.controller.change_reasons.view",["$scope","adminApi",
        "$stateParams","$state","mfl.common.forms.changes","toasty",
        function ($scope,adminApi,$stateParams,$state,formChanges,toasty) {
            if(!_.isUndefined($stateParams.reason_id)){
                $scope.state = true;
                adminApi.change_reasons.get($stateParams.reason_id)
                .success(function (data) {
                    $scope.reason = data;
                    $scope.deleteText = data.reason;
                })
                .error(function  (err) {
                    $scope.errors = err;
                });
                $scope.remove = function () {
                    adminApi.change_reasons.remove($stateParams.reason_id).success(function(){
                        toasty.success({
                            title: "Change reason deleted",
                            msg: "Change reason has been deleted"
                        });
                        $state.go("setup.facility_reasons");
                    }).error(function(error){
                        $scope.errors = error;
                        $state.go("facility_reasons");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_reasons");
                };
            } else {
                $scope.state = false;
            }
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.reason_id)){
                    adminApi.change_reasons.create(frm)
                    .success(function () {
                        toasty.success({
                            title: "Change reason added",
                            msg: "Change reason has been added"
                        });
                        $state.go("setup.facility_reasons");
                    })
                    .error(function (err) {
                        $scope.errors = err;
                    });
                } else {
                    var changes= formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        adminApi.change_reasons.update($stateParams.reason_id,changes)
                        .success(function () {
                            toasty.success({
                                title: "Change reason updated",
                                msg: "Change reason has been updated"
                            });
                            $state.go("setup.facility_reasons");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };
        }])

    /**Facility Regulatory Body**/
    .controller("mfl.setup.controller.facilityRegulatoryBody.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-institution",
                name: "Manage Facility Regulatory Bodies"
            };

            $scope.filters = {
                "fields": "id,name,abbreviation,regulatory_body_type_name,regulation_verb"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_regulatory_bodies.create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='facilities."+
                           "add_regulatingbody' ui-sref-opts='{reload : true}'",
                    class: "btn btn-primary",
                    tipmsg: "Add Regulatory Body",
                    wording: "Add Regulatory Body"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.facilityRegulatoryBody.create",["$scope",
        "$stateParams", "$state", "adminApi",
        function ($scope, $stateParams, $state, adminApi) {
            $scope.title = {
                icon: "fa-plus-circle",
                name: "New Regulatory Body"
            };
            adminApi.contact_types.list()
                .success(function (data) {
                    $scope.contact_types = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                    $scope.errors = err;
                });
            $scope.contacts = {
                items : [
                    {
                        contact_type : "",
                        contact: ""
                    }
                ]
            };
            $scope.facilityRegulatoryBodies = {
                contacts : [
                    {
                        contact_type : "",
                        contact: ""
                    }
                ]
            };
            $scope.contacts = {
                contact_type: "",
                contact: ""
            };
            $scope.add_contact = function () {
                $scope.facilityRegulatoryBodies.contacts.push({
                    contact_type: "",
                    contact : ""
                });
            };
        }
    ])

    .controller("mfl.setup.controller.facilityRegulatoryBody.edit", ["$scope",
        "$stateParams", "adminApi", "mfl.common.forms.changes", "$state","toasty",
        function ($scope, $stateParams, adminApi, formChanges, $state,toasty) {
            $scope.regulatory_body_id = $stateParams.id;
            $scope.facilityRegulatoryBodies = {};
            $scope.cont_length = "";
            if(!$scope.regulatory_body_id){
                $scope.facilityRegulatoryBodies = {
                    contacts : [
                        {
                            contact_type : "",
                            contact: ""
                        }
                    ]
                };
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Regulatory Body"
                };
            }else{
                $scope.spinner = true;
                adminApi.facilityRegulatoryBodies.get($stateParams.id).success(function(data){
                    $scope.facilityRegulatoryBodies = data;
                    $scope.cont_length = $scope.facilityRegulatoryBodies.contacts.length;
                    $scope.deleteText = $scope.facilityRegulatoryBodies.name;
                    $scope.edit = true;
                    $scope.spinner = false;
                }).error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                    $scope.spinner = false;
                });
                $scope.regulatory_body = true;
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Regulatory Body"
                };
                $scope.action = [
                    {
                        func : "ui-sref="+
                        "'setup.facility_regulatory_bodies.edit.delete'" +
                        " requires-user-feature='is_staff'" +
                           " requires-permission='facilities.delete_regulatingbody'",
                        class: "btn btn-danger",

                        wording: "Delete",
                        tipmsg: "Delete Facility Regulatory Body"
                    }
                ];
            }
            $scope.wrapper = adminApi.facilityRegulatoryBodies;
            $scope.add_contact = function () {
                $scope.facilityRegulatoryBodies.contacts.push({
                    contact_type: "",
                    contact : ""
                });
            };
            adminApi.contact_types.list()
                .success(function (data) {
                    $scope.contact_types = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            adminApi.facilityOwnerTypes.filter({"fields": "id,name"})
            .success(function (data) {$scope.owner_types = data.results;})
            .error(function (err) {$scope.errors = err;});

            $scope.remove = function () {
                adminApi.facilityRegulatoryBodies.remove($stateParams.id)
                .success(function(){
                    toasty.success({
                        title: "Regulatory body deleted",
                        msg: "Regulatory body has been deleted"
                    });
                    $state.go("setup.facility_regulatory_bodies");
                })
                .error(function(error){
                    $scope.alert = error.error;
                    $scope.errors = error;
                    $state.go("setup.facility_regulatory_bodies");
                });
            };
            $scope.cancel = function () {
                $state.go("setup.facility_regulatory_bodies.edit");
            };
            $scope.updateFacilityRegulatoryBody = function(id, frm){
                var changes = formChanges.whatChanged(frm);
                if($scope.facilityRegulatoryBodies.contacts.length > 0) {
                    if($scope.facilityRegulatoryBodies.contacts.length >
                        $scope.cont_length){
                        changes.contacts = [];
                    }
                    _.each($scope.facilityRegulatoryBodies.contacts,
                        function (a_cont) {
                            if(_.isUndefined(a_cont.id)){
                                changes.contacts.push(a_cont);
                            }
                        }
                    );
                }
                if(!_.isEmpty(changes)){
                    adminApi.facilityRegulatoryBodies.update(id, changes).success(function(){
                        toasty.success({
                            title: "Regulatory body updated",
                            msg: "Regulatory body has been updated"
                        });
                        $state.go("setup.facility_regulatory_bodies");
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }
            };
            $scope.createFacilityRegulatoryBody = function(frm){
                if(!$scope.regulatory_body_id){
                    adminApi.facilityRegulatoryBodies.create(
                        $scope.facilityRegulatoryBodies)
                    .success(function() {
                        toasty.success({
                            title: "Regulatory body added",
                            msg: "Regulatory body has been added"
                        });
                        $state.go("setup.facility_regulatory_bodies");
                        $scope.regulatory_body = true;
                    }).error(function(error){
                        $scope.alert = error.error;
                        $scope.errors = error;
                    });
                }else{
                    $scope.updateFacilityRegulatoryBody($scope.regulatory_body_id, frm);
                }
            };
            $scope.remove_contact = function (obj) {
                if(!_.isUndefined(obj.id)) {
                    adminApi.RegulatoryBodyContacts.remove(obj.id)
                        .success(function () {
                            adminApi.regulatoryBodyContacts.remove(obj.contact_id)
                                .success(function () {
                                    toasty.success({
                                        title: "Regulatory body contact deleted",
                                        msg: "Regulatory body contact has been deleted"
                                    });
                                    obj.delete_spinner = false;
                                    $scope.facilityRegulatoryBodies.
                                    contacts =_.without(
                                        $scope.facilityRegulatoryBodies.contacts, obj);
                                })
                                .error(function (err) {
                                    $scope.alert = err.error;
                                    $scope.errors = err;
                                    obj.delete_spinner = false;
                                });
                        })
                        .error(function (err) {
                            $scope.alert = err.error;
                            $scope.errors = err;
                            obj.delete_spinner = false;
                        });
                }else{
                    $scope.facilityRegulatoryBodies.contacts =
                        _.without($scope.facilityRegulatoryBodies.
                            contacts, obj);
                }
            };
        }
    ]);

})(window.angular, window._);
