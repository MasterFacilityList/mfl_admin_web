(function(angular, _){
    "use strict";

    angular.module("mfl.chul.controllers.edit", [
        "mfl.common.forms",
        "angular-toasty"
    ])

    .controller("mfl.chul.controllers.edit_chul", ["$scope",
        "mfl.chul.services.wrappers", "$stateParams",
        function ($scope, wrappers, $stateParams) {
            $scope.create = false;
            /*Declaring unit scope variable*/
            $scope.unit = {};
            $scope.unit_id = $stateParams.unit_id;
            wrappers.chuls.get($stateParams.unit_id)
            .success(function (data) {
                $scope.unit = data;
                $scope.select_values = {
                    facility: {
                        "id": $scope.unit.facility,
                        "name": $scope.unit.facility_name
                    }
                };
                $scope.spinner = false;
            })
            .error(function (data) {
                $scope.spinner = false;
                $scope.error = data;
            });
            $scope.setNxt = function (arg) {
                $scope.nxtState = arg;
            };
        }]
    )
    .controller("mfl.chul.controllers.edit_chul.basic", ["$scope",
        "mfl.chul.services.wrappers", "mfl.common.forms.changes", "toasty",
        "$state",
        function ($scope, wrappers, formChanges, toasty, $state) {
            if($scope.create) {
                $scope.nextState();
            }
            var value = new Date();
            $scope.maxDate = value.getFullYear() + "/" + (value.getMonth()+1) +
            "/" + value.getDate();
            wrappers.unit_status.filter({"fields":"id,name"})
            .success(function (data) {
                $scope.unit_status = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.facility_no = {"page_size" : 100000};
            wrappers.facilities.filter($scope.facility_no)
            .success(function (data) {
                $scope.facilities = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            wrappers.contact_types.filter({"fields":"id,name"})
            .success(function (data) {
                $scope.contact_types = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.unitContacts = function (u){
                if(u.contacts.length === 0) {
                    $scope.unit.contacts = [];
                }
            };
            $scope.addContact = function () {
                $scope.unit.contacts.push({contact_type: "", contact : ""});
            };
            $scope.removeContact = function (obj) {
                if(_.isUndefined(obj.id)){
                    $scope.unit.contacts = _.without($scope.unit.contacts,obj);
                }else{
                    wrappers.unit_contacts.remove(obj.id)
                    .success(function () {
                        wrappers.contacts.remove(obj.contact_id)
                        .success(function () {
                            $scope.unit.contacts = _.without(
                                $scope.unit.contacts,obj);
                            toasty.success({
                                title: "Unit Contact Deleted",
                                msg: "Contact successfully deleted"
                            });
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    })
                    .error(function (data) {
                        $scope.errors = data;
                    });
                }
            };
            $scope.unitLocation = function (fac_id) {
                var fac = _.findWhere($scope.facilities, {"id" : fac_id});
                $scope.unit.facility_county = fac.county;
                $scope.unit.facility_subcounty = fac.constituency;
                $scope.unit.facility_ward = fac.ward_name;
            };
            $scope.save = function (frm) {
                $scope.finish = ($scope.nxtState ? "community_units" :
                    "community_units.edit_unit.chews");
                var changes = formChanges.whatChanged(frm);
                $scope.unit.facility = $scope.select_values.facility;
                _.each($scope.unit.contacts, function (curr_obj) {
                    if(_.isEmpty(curr_obj.contact) ||
                        _.isEmpty(curr_obj.contact_type)) {
                        $scope.unit.contacts = _.without($scope.unit.contacts,
                            curr_obj);
                    }
                });
                if(!$scope.create) {
                    if($scope.unit.contacts.length > 0){
                        changes.contacts = $scope.unit.contacts;
                    }
                    wrappers.chuls.update($scope.unit_id, changes)
                    .success(function () {
                        toasty.success({
                            title: "Community Unit Update",
                            msg: "Community Unit successfully updated"
                        });
                        $state.go($scope.finish, {reload : true});
                    })
                    .error(function (data) {
                        $scope.errors = data;
                    });
                }else{
                    if(_.isEmpty($state.params.unit_id)){
                        wrappers.chuls.create($scope.unit)
                        .success(function (data) {
                            $state.go("community_units.create_unit.chews",
                                {unit_id : data.id, furthest : 2},{reload : true});
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }else{
                        wrappers.chuls.update($state.params.unit_id, changes)
                        .success(function () {
                            $state.go("community_units.create_unit.chews",
                                {unit_id : $state.params.unit_id, furthest : 2},{reload : true});
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }
                }
            };
            /*Wait for facility to be defined*/
            $scope.$watch("unit", function (u) {
                if (_.isUndefined(u)){
                    return;
                }
                if(u.hasOwnProperty("contacts")){
                    $scope.unitContacts(u);
                }
            });
        }]
    )
    .controller("mfl.chul.controllers.edit_chul.chews", ["$scope",
        "mfl.chul.services.wrappers", "toasty", "$state",
        function ($scope, wrappers, toasty, $state) {
            if($scope.create) {
                $scope.nextState();
            }
            $scope.unitWorkers = function (u){
                if(u.health_unit_workers.length === 0) {
                    $scope.unit.health_unit_workers.push({
                        "first_name" : "",
                        "last_name" : "",
                        "is_incharge" : false
                    });
                }
            };
            $scope.addChew = function () {
                $scope.unit.health_unit_workers.push({
                    "first_name" : "",
                    "last_name" : "",
                    "is_incharge" : false
                });
            };
            $scope.removeChew = function (obj) {
                if(_.isUndefined(obj.id)){
                    $scope.unit.health_unit_workers = _.without(
                        $scope.unit.health_unit_workers, obj);
                }else{
                    wrappers.workers.remove(obj.id)
                    .success(function (){
                        $scope.unit.health_unit_workers = _.without(
                            $scope.unit.health_unit_workers, obj);
                        toasty.success({
                            title: "Community Unit Worker Deleted",
                            msg: "Community Unit woker successfully deleted"
                        });
                    })
                    .error(function (data) {
                        $scope.errors = data;
                    });
                }
            };
            /*Creating health workers*/
            $scope.saveChews = function () {
                $scope.workers = {health_unit_workers : []};
                $scope.workers.health_unit_workers =
                    $scope.unit.health_unit_workers;
                if($scope.workers.health_unit_workers.length > 0){
                    var save_msg = $scope.create ? "Added" : "Updated";
                    wrappers.chuls.update($scope.unit_id, $scope.workers)
                    .success(function () {
                        toasty.success({
                            title: "Community Unit " + save_msg,
                            msg: "Community Unit successfully " + save_msg
                        });
                        $state.go("community_units", {reload: true});
                    })
                    .error(function (data) {
                        $scope.errors = data;
                    });
                }
            };
            /*Wait for facility to be defined*/
            $scope.$watch("unit", function (u) {
                if (_.isUndefined(u)){
                    return;
                }
                if(u.hasOwnProperty("health_unit_workers")){
                    $scope.unitWorkers(u);
                }
            });
        }]
    );

})(window.angular, window._);
