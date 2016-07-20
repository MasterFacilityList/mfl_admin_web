(function(angular, _){

    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.facilities.controllers
     *
     * @description
     * Contains all the controllers used for facility setup
     */
    angular.module("mfl.setup.facilities.controllers",[
        "mfl.setup.api",
        "mfl.common.filters"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityOwnerType.list
     *
     * @description
     * The controller used to list facility owner types
     */
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

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityOwnerType.view
     *
     * @description
     * The controller used to view a facility owner type
     */
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
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityOwner.list
     *
     * @description
     * The controller used to list facility owners
     */
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

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityOwner.view
     *
     * @description
     * The controller used to view/edit a facility owner
     */
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

            adminApi.facilityOwnerTypes.filter({"fields":"id,name"})
            .success(function(ownerTypes){
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
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityJobTitle.list
     *
     * @description
     * The controller used to list facility job titles
     */
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
                           " requires-permission='users.add_jobtitle'",
                    class: "btn btn-primary",
                    tipmsg: "Add Job Title",
                    wording: "Add Job Title"
                }
            ];
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityJobTitle.view
     *
     * @description
     * The controller used to view/edit a facility job title
     */
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
                           " requires-permission='users.delete_jobtitle'",
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

        /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.change_reasons.list
     *
     * @description
     * The controller used to list facility change reasons
     */
    .controller("mfl.setup.controller.change_reasons.list",["$scope",
        function ($scope) {
            $scope.filters = {"fields":"id,reason,description"};
        }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.change_reasons.view
     *
     * @description
     * The controller used to view/edit a facility change reason
     */
    .controller("mfl.setup.controller.change_reasons.view",["$scope","adminApi",
        "$stateParams","$state","mfl.common.forms.changes","toasty",
        function ($scope,adminApi,$stateParams,$state,formChanges,toasty) {
            $scope.wrapper = adminApi.change_reasons;
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

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityRegulatoryBody.list
     *
     * @description
     * The controller used to list facility regulatory bodies
     */
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

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityRegulatoryBody.create
     *
     * @description
     * The controller used to create a facility regulatory body
     */
    .controller("mfl.setup.controller.facilityRegulatoryBody.create",["$scope",
        "$stateParams", "$state", "adminApi",
        function ($scope, $stateParams, $state, adminApi) {
            $scope.title = {
                icon: "fa-plus-circle",
                name: "New Regulatory Body"
            };
            adminApi.contact_types.filter({"fields":"id,name"})
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

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facilityRegulatoryBody.edit
     *
     * @description
     * The controller used to view/edit a facility regulatory body
     */
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
            adminApi.contact_types.filter({"fields":"id,name"})
                .success(function (data) {
                    $scope.contact_types = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            adminApi.facilityOwnerTypes.filter({"fields": "id,name"})
            .success(function (data) {$scope.owner_types = data.results;})
            .error(function (err) {$scope.errors = err;});

            adminApi.regulation_statuses.filter({"fields": "id,name"})
            .success(function (data) {$scope.regulation_status= data.results;})
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
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facility_depts.list
     *
     * @description
     * The controller used to list facility departments/units
     */
    .controller("mfl.setup.controller.facility_depts.list", ["$scope", function ($scope) {
        $scope.filters = {"fields":"id,name,description"};
    }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facility_depts.view
     *
     * @description
     * The controller used to view/edit a facility department/unit
     */
    .controller("mfl.setup.controller.facility_depts.view",["$scope","adminApi",
        "$stateParams","$state","mfl.common.forms.changes","toasty",
        function ($scope,adminApi,$stateParams,$state,formChanges,toasty) {
            $scope.wrapper = adminApi.facility_depts;

            adminApi.facilityRegulatoryBodies.filter({"fields": "id,name"})
            .success(function(data){$scope.regulatory_bodies = data.results;})
            .error(function(data){$scope.errors = data;});

            if(!_.isUndefined($stateParams.dept_id)){
                $scope.state = true;
                adminApi.facility_depts.get($stateParams.dept_id)
                .success(function (data) {
                    $scope.facility_dept = data;
                    $scope.deleteText = data.name;
                })
                .error(function  (err) {
                    $scope.errors = err;
                });
                $scope.remove = function () {
                    adminApi.facility_depts.remove($stateParams.dept_id).success(function(){
                        toasty.success({
                            title: "Facility department deleted",
                            msg: "Facility department has been deleted"
                        });
                        $state.go("setup.facility_depts");
                    }).error(function(error){
                        $scope.errors = error;
                        $state.go("setup.facility_depts");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_depts");
                };
            } else {
                $scope.state = false;
            }
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.dept_id)){
                    adminApi.facility_depts.create(frm)
                    .success(function () {
                        toasty.success({
                            title: "Facility department added",
                            msg: "Facility department has been added"
                        });
                        $state.go("setup.facility_depts");
                    })
                    .error(function (err) {
                        $scope.errors = err;
                    });
                } else {
                    var changes= formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        adminApi.facility_depts.update($stateParams.dept_id, changes)
                        .success(function () {
                            toasty.success({
                                title: "Facility department updated",
                                msg: "Facility department has been updated"
                            });
                            $state.go("setup.facility_depts");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };
        }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facility_types.list
     *
     * @description
     * The controller used to list facility types
     */
    .controller("mfl.setup.controller.facility_types.list", ["$scope", function ($scope) {
        $scope.filters = {"fields":"id,name,sub_division"};
    }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facility_types.view
     *
     * @description
     * The controller used to view/edit a facility type
     */
    .controller("mfl.setup.controller.facility_types.view",["$scope","adminApi",
        "$stateParams","$state","mfl.common.forms.changes","toasty",
        function ($scope,adminApi,$stateParams,$state,formChanges,toasty) {
            $scope.clearUiSelect = function($event, $select) {
                  $event.stopPropagation();
                  $select.selected = '';
                  $select.search = null;
            };

            $scope.wrapper = adminApi.facility_types;
            // $scope.sub_division = {
            //     "name": ""
            // };
            var type_filters = {
                page_size:1000,
                fields:"id,name,sub_division"
            };

            adminApi.facility_types.filter(type_filters)
            .success(function(data){
                $scope.facility_types = data.results;
            })
            .error(function(err){
                $scope.errors = err;
            });

            if(!_.isUndefined($stateParams.type_id)){
                $scope.state = true;
                adminApi.facility_types.get($stateParams.type_id)
                .success(function (data) {
                    $scope.facility_type = data;
                    $scope.deleteText = data.name;
                })
                .error(function  (err) {
                    $scope.errors = err;
                });
                // $scope.sub_division = {
                //     "name": $scope.facility_type.sub_division
                // };
                $scope.remove = function () {
                    adminApi.facility_types.remove($stateParams.type_id).success(function(){
                        toasty.success({
                            title: "Facility type deleted",
                            msg: "Facility type has been deleted"
                        });
                        $state.go("setup.facility_types");
                    }).error(function(error){
                        $scope.errors = error;
                        $state.go("setup.facility_types");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_types");
                };
            } else {
                $scope.state = false;
            }
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.type_id)){
                    adminApi.facility_types.create(frm)
                    .success(function () {
                        toasty.success({
                            title: "Facility type added",
                            msg: "Facility type has been added"
                        });
                        $state.go("setup.facility_types");
                    })
                    .error(function (err) {
                        $scope.errors = err;
                    });
                } else {
                    var changes= formChanges.whatChanged(frm);

                    var sub_division_change = changes.sub_division;

                    if(_.isUndefined(sub_division_change)){
                        changes.sub_division = null;
                    }

                    if(!_.isEmpty(changes)){
                        adminApi.facility_types.update($stateParams.type_id, changes)
                        .success(function () {
                            toasty.success({
                                title: "Facility type updated",
                                msg: "Facility type has been updated"
                            });
                            $state.go("setup.facility_types");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };
        }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facility_statuses.list
     *
     * @description
     * The controller used to list facility statuses
     */
    .controller("mfl.setup.controller.facility_statuses.list", ["$scope", function ($scope) {
        $scope.filters = {"fields":"id,name"};
    }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.facility_statuses.view
     *
     * @description
     * The controller used to view/edit a facility status
     */
    .controller("mfl.setup.controller.facility_statuses.view",["$scope","adminApi",
        "$stateParams","$state","mfl.common.forms.changes","toasty",
        function ($scope,adminApi,$stateParams,$state,formChanges,toasty) {
            $scope.wrapper = adminApi.facility_statuses;

            if(!_.isUndefined($stateParams.status_id)){
                $scope.state = true;
                adminApi.facility_statuses.get($stateParams.status_id)
                .success(function (data) {
                    $scope.facility_status = data;
                    $scope.deleteText = data.name;
                })
                .error(function  (err) {
                    $scope.errors = err;
                });
                $scope.remove = function () {
                    adminApi.facility_statuses.remove($stateParams.status_id).success(function(){
                        toasty.success({
                            title: "Facility status deleted",
                            msg: "Facility status has been deleted"
                        });
                        $state.go("setup.facility_statuses");
                    }).error(function(error){
                        $scope.errors = error;
                        $state.go("setup.facility_statuses");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_statuses");
                };
            } else {
                $scope.state = false;
            }
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.status_id)){
                    adminApi.facility_statuses.create(frm)
                    .success(function () {
                        toasty.success({
                            title: "Facility status added",
                            msg: "Facility status has been added"
                        });
                        $state.go("setup.facility_statuses");
                    })
                    .error(function (err) {
                        $scope.errors = err;
                    });
                } else {
                    var changes= formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        adminApi.facility_statuses.update($stateParams.status_id, changes)
                        .success(function () {
                            toasty.success({
                                title: "Facility status updated",
                                msg: "Facility status has been updated"
                            });
                            $state.go("setup.facility_statuses");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };
        }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.regulation_statuses.list
     *
     * @description
     * The controller used to list regulation statuses
     */
    .controller("mfl.setup.controller.regulation_statuses.list", ["$scope", function ($scope) {
        $scope.filters = {"fields":"id,name"};
    }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.regulation_statuses.view
     *
     * @description
     * The controller used to view/edit a regulation status
     */
    .controller("mfl.setup.controller.regulation_statuses.view",["$scope","adminApi",
        "$stateParams","$state","mfl.common.forms.changes","toasty",
        function ($scope,adminApi,$stateParams,$state,formChanges,toasty) {
            $scope.wrapper = adminApi.regulation_statuses;

            if(!_.isUndefined($stateParams.regstatus_id)){
                $scope.state = true;
                adminApi.regulation_statuses.get($stateParams.regstatus_id)
                .success(function (data) {
                    $scope.regulation_status = data;
                    $scope.deleteText = data.name;
                })
                .error(function  (err) {
                    $scope.errors = err;
                });
                $scope.remove = function () {
                    adminApi.regulation_statuses.remove($stateParams.regstatus_id)
                        .success(function(){
                        toasty.success({
                            title: "Regulation status deleted",
                            msg: "Regulation status has been deleted"
                        });
                        $state.go("setup.regulation_statuses");
                    }).error(function(error){
                        $scope.errors = error;
                        $state.go("setup.regulation_statuses");
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.regulation_statuses");
                };
            } else {
                $scope.state = false;
            }
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.regstatus_id)){
                    adminApi.regulation_statuses.create(frm)
                    .success(function () {
                        toasty.success({
                            title: "Regulation status added",
                            msg: "Regulation status has been added"
                        });
                        $state.go("setup.regulation_statuses");
                    })
                    .error(function (err) {
                        $scope.errors = err;
                    });
                } else {
                    var changes= formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        adminApi.regulation_statuses.update($stateParams.regstatus_id, changes)
                        .success(function () {
                            toasty.success({
                                title: "Regulation status updated",
                                msg: "Regulation status has been updated"
                            });
                            $state.go("setup.regulation_statuses");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };
        }])
;

})(window.angular, window._);
