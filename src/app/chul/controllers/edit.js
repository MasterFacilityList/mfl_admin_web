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
            wrappers.unit_status.list()
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
            wrappers.contact_types.list()
            .success(function (data) {
                $scope.contact_types = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.unit_contacts = [
                {
                    contact_type : "",
                    contact : ""
                }
            ];
            $scope.addContact = function () {
                $scope.unit_contacts.push({contact_type: "", contact : ""});
            };
            $scope.removeContact = function (obj) {
                $scope.unit_contacts = _.without($scope.unit_contacts, obj);
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
                if(!$scope.create) {
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
        }]
    )
    .controller("mfl.chul.controllers.edit_chul.chews", ["$scope",
        function ($scope) {
            if($scope.create) {
                $scope.nextState();
            }
            $scope.unitWorkers = function (u){
                if(u.health_unit_workers.length === 0) {
                    $scope.unit.health_unit_workers.push({
                        "first_name" : "",
                        "last_name" : "",
                        "id_number" : "",
                        "is_incharge" : ""
                    });
                }
            };
            $scope.addChew = function () {
                $scope.unit.health_unit_workers.push({
                    "first_name" : "",
                    "last_name" : "",
                    "id_number" : "",
                    "is_incharge" : ""
                });
            };
            $scope.removeChew = function (obj) {
                $scope.unit.health_unit_workers = _.without(
                    $scope.unit.health_unit_workers, obj);
            };
            /*Wait for facility to be defined*/
            $scope.$watch("unit", function (u) {
                if (_.isUndefined(u)){
                    return;
                }
                $scope.unitWorkers(u);
            });
        }]
    );

})(window.angular, window._);
