(function(angular, _){
    "use strict";

    angular.module("mfl.chul.controllers.create", [
        "mfl.common.forms",
        "mfl.common.services",
        "angular-toasty"
    ])

    .controller("mfl.chul.controllers.create_chul", ["$scope",
        "mfl.common.services.multistep", "$state", "$stateParams",
        "mfl.chul.services.wrappers",
        function ($scope, multistepService, $state, $stateParams, wrappers) {
            $scope.create = true;
            /*Declaring unit scope variable*/
            $scope.unit = {
                contacts : [
                    {
                        contact_type: "",
                        contacts: ""
                    }
                ]
            };
            $scope.steps = [
                {
                    name : "basic",
                    prev : [],
                    count: "1"
                },
                {
                    name : "chews",
                    prev : ["basic"],
                    count: "2"
                }
            ];
            $scope.new_unit = $state.params.unit_id;
            $scope.furthest = $stateParams.furthest;
            if(_.isEmpty($state.params.unit_id)) {
                $scope.select_values = {};
            }else{
                $scope.unit_id = $state.params.unit_id;
                wrappers.chuls.get($state.params.unit_id)
                .success(function (data) {
                    $scope.unit = data;
                    $scope.select_values = {
                        facility: {
                            "id": $scope.unit.facility,
                            "name": $scope.unit.facility_name
                        }
                    };
                })
                .error(function (data) {
                    $scope.error = data;
                });
            }
            $scope.nextState = function () {
                var curr = $state.current.name;
                curr = curr.split(".", 3).pop();
                multistepService.nextState($scope, $stateParams ,
                    $scope.steps, curr);
            };
            $scope.tabState = function (obj) {
                if(obj.active || obj.done || obj.furthest) {
                    $scope.nextState();
                    $state.go("community_units.create_unit."+ obj.name,
                    {furthest: $scope.furthest, unit_id : $scope.new_unit});
                }
            };
        }]
    );

})(window.angular, window._);
