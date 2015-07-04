(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.create", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services"
    ])

    .controller("mfl.facility_mgmt.controllers.facility_create", ["$scope",
    "$stateParams", "mfl.facility.multistep.service",
    "mfl.common.services.multistep", "$state", "$q",
    function ($scope, $stateParams, facilityMultistepService,
        multistepService, $state, $q) {
        $scope.test = "New";
        $scope.create = true;
        $scope.new_facility = $state.params.facility_id;
        $scope.furthest = $stateParams.furthest;
        //intializing ui select values
        if(_.isEmpty($state.params.facility_id)){
            $scope.select_values = {};
        }
        $scope.selectReload = function (wrapper, order_field, search_term,
        scope_var) {
            if (_.isEmpty(search_term) || (! _.isString(search_term))) {
                return $q.reject();
            }
            return wrapper.filter(
                {page_size: 20, "ordering": order_field, "search_auto": search_term}
            )
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
    }]);

})(angular);
