(function(angular, _) {
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.create", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facility_create", ["$scope",
    "$stateParams", "mfl.facility.multistep.service",
    "mfl.common.services.multistep", "$state", "$q", "$log",
    "mfl.facility_mgmt.services.wrappers",
    function ($scope, $stateParams, facilityMultistepService,
        multistepService, $state, $q, $log, wrappers) {
        $scope.print = false;
        $scope.create = true;
        //declaration of facility scope variable
        $scope.facility = {};
        $scope.new_facility = $state.params.facility_id;
        $scope.facility_id = $state.params.facility_id;
        $scope.furthest = $stateParams.furthest;
        //intializing ui select values
        if(_.isEmpty($state.params.facility_id)){
            $scope.select_values = {};
        } else {
            wrappers.facility_detail.get($scope.new_facility)
                .success(function(data){
                    $scope.spinner = false;
                    $scope.facility = data;
                    $scope.select_values = {
                        ward: {
                            "id": $scope.facility.ward,
                            "name": $scope.facility.ward_name
                        },
                        facility_type: {
                            "id": $scope.facility.facility_type,
                            "name": $scope.facility.facility_type_name
                        },
                        owner: {
                            "id": $scope.facility.owner,
                            "name": $scope.facility.owner_name
                        },
                        operation_status: {
                            "id": $scope.facility.operation_status,
                            "name": $scope.facility.operation_status_name
                        },
                        regulatory_body: {
                            "id": $scope.facility.regulatory_body,
                            "name": $scope.facility.regulatory_body_name
                        },
                        keph_level: {
                            "id": $scope.facility.keph_level,
                            "name": $scope.facility.keph_level_name
                        },
                        town: {
                            "id": $scope.facility_physical_address ?
                            $scope.facility_physical_address.town_id : "",
                            "name": $scope.facility_physical_address ?
                            $scope.facility_physical_address.town : ""
                        }
                    };
                })
                .error(function (data) {
                    $log.error(data);
                });
        }
        $scope.selectReload = function (wrapper, search_term, scope_var, extra_filters) {
            if (! _.isString(search_term)) {
                return $q.reject();
            }
            var filters = _.isEmpty(search_term) ? {} : {"search_auto": search_term};
            return wrapper.filter(_.extend(filters, extra_filters))
            .success(function (data) {
                $scope[scope_var] = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
        };
        $scope.steps = facilityMultistepService.facilityObject();
        //multistep config
        $scope.nextState = function () {
            var curr = $state.current.name;
            curr = curr.split(".", 3).pop();
            multistepService.nextState($scope, $stateParams ,
                $scope.steps, curr);
        };
        $scope.tabState = function (obj) {
            if(obj.active || obj.done || obj.furthest) {
                $scope.nextState();
                $state.go("facilities.facility_create."+ obj.name,
                {furthest: $scope.furthest,
                facility_id : $scope.new_facility});
            }
        };
        $scope.setFurthest = function (val) {
            if($scope.furthest < val) {
                $scope.furthest = val;
            }
        };
        $scope.goToNext = function (furthest_value, state_name) {
            $scope.setFurthest(furthest_value);
            $state.go("facilities.facility_create."+ state_name,
                {furthest: $scope.furthest,
                facility_id : $scope.new_facility});
        };
        $scope.printFacility = wrappers.printFacility;
    }])

    .controller("mfl.facility_mgmt.controllers.facility_create.facility_print", ["$scope",
        "mfl.facility_mgmt.services.wrappers", "$state", "$stateParams",
        function ($scope, wrappers, $state, $stateParams) {
            $scope.$parent.print = true;
            $scope.fac_id = $stateParams.facility_id || $state.params.facility_id;
            if(!_.isUndefined($stateParams.facility_id) &&
                !_.isEmpty($stateParams.facility_id)){
                $scope.spinner = true;
                wrappers.facility_detail.get($scope.fac_id)
                    .success(function(data){
                        $scope.facility = data;
                        $scope.spinner = false;
                    }).error(function (error) {
                        $scope.alert = error;
                        $scope.spinner = false;
                    });
            }
            $scope.getFacilityCoords = function (f) {
                wrappers.facility_coordinates.get(f.coordinates)
                    .success(function (data) {
                        $scope.gis = data;
                    })
                    .error(function (e) {
                        $scope.alert = e.error;
                    });
            };
            /*facility units*/
            wrappers.facility_units.filter(
            {facility:$scope.fac_id})
            .success(function(data){
                $scope.fac_units = data.results;
            })
            .error(function (e) {
                $scope.alert = e.error;
            });
            $scope.$watch("facility", function (f) {
                if (_.isUndefined(f)){
                    return;
                }
                if(!_.isNull(f.coordinates)) {
                    $scope.getFacilityCoords(f);
                }
            });
            $scope.printFacility = wrappers.printFacility;
        }
    ]);

})(window.angular, window._);
