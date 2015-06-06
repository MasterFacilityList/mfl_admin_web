(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.create", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.create.base", ["$scope","$state",
        "$stateParams", "safeApply",
        "mfl.facilities.wrappers", function($scope, $state, $stateParams, safeApply,facilityApi){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Create Facility: Facility Details"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
        $scope.filterData = {
            constituency: [],
            ward: []
        };
        $scope.getOptionsData = {
            getData: function(callback, what){
                facilityApi.filterOptions.filter({fields: what})
                .success(function(data){
                    callback(data[what]);
                }).error(function(error){
                    callback([]);
                    $scope.alert = error.error;
                });
            },
            county: function(callback){
                $scope.getOptionsData.getData(callback, "county");
            },
            facilityType: function(callback){
                $scope.getOptionsData.getData(callback, "facility_type");
            },
            operationStatus: function(callback){
                $scope.getOptionsData.getData(callback, "operation_status");
            },
            owner: function(callback){
                $scope.getOptionsData.getData(callback, "owner");
            },
            constituency: function(callback){
                $scope.getOptionsData.getData(callback, "constituency");

            },
            ward: function(callback){
                $scope.getOptionsData.getData(callback, "ward");
            }
        };

        $scope.events = {
            getData: function(filter, key,  api){
                api.filter(filter).success(function(data){
                    $scope.filterData[key] = [];
                    $scope.filterData[key] = data.results;
                    safeApply($scope);
                }).error(function(error){
                    $scope.alert = error.error_msg;
                    $scope.filterData[key] = [];
                });
            },
            county: function(value){
                $scope.events.getData(
                    {county:value.id}, "constituency", facilityApi.constituencies);
            },
            constituency: function(value){
                $scope.events.getData(
                    {constituency:value.id}, "ward", facilityApi.wards);
            }
        };
        if(!_.isEmpty($stateParams) || !_.isEmpty($stateParams.facilityId)){
            facilityApi.facilities.get($stateParams.facilityId).success(function(data){
                $scope.facility = data;
            }).error(function(err){
                $scope.alert = err.error_msg;
            }) ;
        }
        $scope.saveFacility = function(facility){
            facilityApi.facilities.create(
                facilityApi.utils.cleanFormData(facility)).success(function(data){
                $scope.facility = data;
                $state.go("facilities.create.address", {facilityId: $scope.facilityId});
            }).error(function(error){
                $scope.alert = error.error_msg;
            });
        };
    }])
    .controller("mfl.facilities.controllers.create.address", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Create Facility: Address Details"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])

    .controller("mfl.facilities.controllers.create.contacts", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Create Facility: Contacts Details"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.facilities.controllers.create.services", ["$scope", function($scope){
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Create Facility: Services"
            }
        ];
        $scope.action = [
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }]);
})(angular);
