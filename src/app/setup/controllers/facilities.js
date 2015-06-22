(function(angular){
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
                name: "Manage Facility Owner Types"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_owner_types.create'",
                    class: "action-btn action-btn-primary action-btn-md",

                    tipmsg: "Add Facility Owner Type",
                    icon: "fa-plus"
                }
            ];
        }]
    )
    .controller("mfl.setup.controller.facilityOwnerType.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){

            if(!_.isUndefined($stateParams.id) &&
                $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Owner Types"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.facility_owner_types.view.delete'",
                        class: "action-btn action-btn-danger action-btn-md",

                        tipmsg: "Delete Facility Owner Type",
                        icon: "fa-trash"
                    }
                ];
                adminApi.facilityOwnerTypes.get($stateParams.id).success(function(data){
                    $scope.facilityOwnerTypes = data;
                    $scope.deleteText = $scope.facilityOwnerTypes.name;
                }).error(function(error){
                    $scope.alert = error.error;
                });
                $scope.remove = function () {
                    adminApi.facilityOwnerTypes.remove($stateParams.id).success(function(){
                        $state.go("setup.facility_owner_types",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
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
                    name: "New Facility Owner Types"
                };
            }

            $scope.updateFacilityOwnerTypes = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.facilityOwnerTypes.update(id, changes).success(function(){
                        $state.go("setup.facility_owner_types");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };

            $scope.createFacilityOwnerTypes = function(ownerType){
                adminApi.facilityOwnerTypes.create(ownerType).success(function(){
                    $state.go("setup.facility_owner_types");
                }).error(function(error){
                    $scope.alert = error.error;
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
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_owners.create'",
                    class: "action-btn action-btn-primary action-btn-md",

                    tipmsg: "Add Facility Owner",
                    icon: "fa-plus"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.facilityOwner.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges) {
            if(!_.isUndefined($stateParams.id)&&
                $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Owner"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.facility_owners.view.delete'",
                        class: "action-btn action-btn-danger action-btn-md",

                        tipmsg: "Delete Facility Owner",
                        icon: "fa-trash"
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
                });
                $scope.remove = function () {
                    adminApi.facilityOwners.remove($stateParams.id).success(function(){
                        $state.go("setup.facility_owners",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
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
            });


            $scope.updateFacilityOwner = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.facilityOwners.update(id, changes).success(function(){
                        $state.go("setup.facility_owners");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };

            $scope.createFacilityOwner = function(owner){
                adminApi.facilityOwners.create(owner).success(function(){
                    $state.go("setup.facility_owners");
                }).error(function(error){
                    $scope.alert = error.error;
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
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_job_titles.create'",
                    class: "action-btn action-btn-primary action-btn-md",

                    tipmsg: "Add Job Title",
                    icon: "fa-plus"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.facilityJobTitle.view", ["$scope","$state", "$stateParams",
                "adminApi","mfl.common.forms.changes",
        function($scope, $state, $stateParams, adminApi, formChanges){
            $scope.tooltip = {
                "title": "",
                "checked": false
            };

            if(!_.isUndefined($stateParams.id)  && $stateParams.id !== "create"){
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Job Title"
                };
                $scope.action = [
                    {
                        func : "ui-sref='setup.facility_job_titles.view.delete'",
                        class: "action-btn action-btn-danger action-btn-md",

                        tipmsg: "Delete Facility Job Title",
                        icon: "fa-trash"
                    }
                ];
                adminApi.facilityJobTitles.get($stateParams.id).success(function(data){
                    $scope.facilityJobTitles = data;
                    $scope.deleteText = $scope.facilityJobTitles.name;
                }).error(function(error){
                    $scope.alert = error.error;
                });
                $scope.remove = function () {
                    adminApi.facilityJobTitles.remove($stateParams.id).success(function(){
                        $state.go("setup.facility_job_titles",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $state.go("setup.facility_job_titles",{},{reload:true});
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
                        $state.go("setup.facility_job_titles");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };
            $scope.createFacilityJobTitle = function(title){
                adminApi.facilityJobTitles.create(title).success(function(){
                    $state.go("setup.facility_job_titles");
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
        }]
    )

    /**
        Facility Regulatory Body

    **/
    .controller("mfl.setup.controller.facilityRegulatoryBody.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-institution",
                name: "Manage Facility Regulatory Bodies"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.facility_regulatory_bodies.create.basic'",
                    class: "action-btn action-btn-primary action-btn-md",

                    tipmsg: "Add Regulatory Body",
                    icon: "fa-plus"
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
                });
            $scope.contacts = {
                items : []
            };
            $scope.contact = {
                contact_type: "",
                contact: ""
            };
            $scope.add = function () {
                $scope.spinner = true;
                adminApi.regulatoryBodyContacts.create({
                    "contact_type": $scope.contact.contact_type,
                    "contact": $scope.contact.contact
                })
                .success(function (data) {
                    adminApi.RegulatoryBodyContacts.create({
                        "regulating_body" : $state.params.reg_cont_id,
                        "contact" : data.id
                    })
                    .success(function (data) {
                        $scope.contact = {
                            contact_type : "",
                            contact : ""
                        };
                        $scope.contacts.items.push(data);
                        $scope.spinner = false;
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                        $scope.spinner = false;
                    });
                })
                .error(function (err) {
                    $scope.alert = err.error;
                    $scope.spinner = false;
                });
            };
            $scope.remove_contact = function (obj) {
                obj.delete_spinner = true;
                adminApi.RegulatoryBodyContacts.remove(obj.id)
                    .success(function () {
                        adminApi.regulatoryBodyContacts.remove(obj.contact)
                            .success(function () {
                                obj.delete_spinner = false;
                                $scope.contacts.items =
                                _.without($scope.contacts.items, obj);
                            })
                            .error(function (err) {
                                $scope.alert = err.error;
                                obj.delete_spinner = false;
                            });
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                        obj.delete_spinner = false;
                    });

            };
        }
    ])
    .controller("mfl.setup.controller.facilityRegulatoryBody.edit", ["$scope",
        "$stateParams", "adminApi", "mfl.common.forms.changes", "$state",
        function ($scope, $stateParams, adminApi, formChanges, $state) {
            $scope.contacts = {
                items : []
            };
            adminApi.contact_types.list()
                .success(function (data) {
                    $scope.contact_types = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            adminApi.RegulatoryBodyContacts.filter(
                {"regulating_body" : $stateParams.id})
                .success(function (data) {
                    $scope.contacts.items = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });

            if($stateParams.id !== "create") {
                $scope.regulatory_body = true;
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit Facility Regulatory Body"
                };
                $scope.action = [
                    {
                        func : "ui-sref="+
                        "'setup.facility_regulatory_bodies.edit.delete'",
                        class: "action-btn action-btn-danger action-btn-md",

                        tipmsg: "Delete Facility Regulatory Body",
                        icon: "fa-trash"
                    }
                ];
                adminApi.facilityRegulatoryBodies.get($stateParams.id).success(function(data){
                    $scope.facilityRegulatoryBodies = data;
                    $scope.deleteText = $scope.facilityRegulatoryBodies.name;
                    $scope.edit = true;
                }).error(function(error){
                    $scope.alert = error.error;
                });
                $scope.remove = function () {
                    adminApi.facilityRegulatoryBodies.remove($stateParams.id).success(function(){
                        $state.go("setup.facility_regulatory_bodies",{},{reload:true});
                    }).error(function(error){
                        $scope.alert = error.error;
                        $state.go("setup.facility_regulatory_bodies",{},{reload:true});
                    });
                };
                $scope.cancel = function () {
                    $state.go("setup.facility_regulatory_bodies.edit.basic");
                };
            }
            else {
                $scope.title = {
                    icon: "fa-plus-circle",
                    name: "New Regulatory Body"
                };
            }
            $scope.updateFacilityRegulatoryBody = function(id, frm){
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.facilityRegulatoryBodies.update(id, changes).success(function(){
                        $state.go("setup.facility_regulatory_bodies");
                    }).error(function(error){
                        $scope.alert = error.error;
                    });
                }
            };
            $scope.createFacilityRegulatoryBody = function(regulatoryBody){
                adminApi.facilityRegulatoryBodies.create(regulatoryBody).success(function(data){
                    $state.go(
                        "setup.facility_regulatory_bodies.create.contacts",
                        {reg_cont_id : data.id});
                    $scope.regulatory_body = true;
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
            $scope.contact = {
                contact_type: "",
                contact: ""
            };
            $scope.add = function () {
                $scope.spinner = true;
                adminApi.regulatoryBodyContacts.create({
                    "contact_type": $scope.contact.contact_type,
                    "contact": $scope.contact.contact
                })
                .success(function (data) {
                    adminApi.RegulatoryBodyContacts.create({
                        "regulating_body" : $stateParams.id,
                        "contact" : data.id
                    })
                    .success(function (data) {
                        $scope.contact = {
                            contact_type : "",
                            contact : ""
                        };
                        $scope.contacts.items.push(data);
                        $scope.spinner = false;
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                        $scope.spinner = false;
                    });
                })
                .error(function (err) {
                    $scope.alert = err.error;
                    $scope.spinner = false;
                });
            };
            $scope.remove_contact = function (obj) {
                obj.delete_spinner = true;
                adminApi.RegulatoryBodyContacts.remove(obj.id)
                    .success(function () {
                        adminApi.regulatoryBodyContacts.remove(obj.contact)
                            .success(function () {
                                obj.delete_spinner = false;
                                $scope.contacts.items =
                                _.without($scope.contacts.items, obj);
                            })
                            .error(function (err) {
                                $scope.alert = err.error;
                                obj.delete_spinner = false;
                            });
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                        obj.delete_spinner = false;
                    });

            };
        }
    ]);

})(angular);

