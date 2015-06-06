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
                facilityApi.utils.resolvePromise($scope,$scope.filterData, key, api.filter(filter));
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
            facilityApi.utils.resolvePromise(
                $scope,$scope, facilityApi.facilities.get($stateParams.facilityId));
        }
        $scope.saveFacility = function(facility){
            facilityApi.facilities.create(
                facilityApi.utils.cleanFormData(facility)).success(function(data){
                $scope.facility = data;
                $state.go("facilities.create.address", {facilityId: $scope.facility.id});
            }).error(function(error){
                $scope.alert = error.error_msg.error;
            });
        };
    }])
    .controller("mfl.facilities.controllers.create.address", ["$scope","$state",
    "$stateParams", "mfl.facilities.wrappers",
    function($scope, $state, $stateParams, facilityApi){
        facilityApi.utils.createLock($stateParams, $state);
        $scope.facility= {
            id : $stateParams.facilityId
        };
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

    .controller("mfl.facilities.controllers.create.contacts", ["$scope",
     "$stateParams","$state", "mfl.facilities.wrappers",
     function($scope, $stateParams,$state, facilityApi){
        facilityApi.utils.createLock($stateParams, $state);
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.facility= {
            id : $stateParams.facilityId
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
        $scope.getOptionsData = {
            contactType: function(callback){
                facilityApi.contact_types.list()
                .success(function(data){
                    callback(data.results);
                }).error(function(error){
                    callback([]);
                    $scope.alert = facilityApi.utils.getError(error);
                });
            }
        };
        $scope.filters ={
            facility: $scope.facility.id,
            page_size: 3
        };
        $scope.saveContact = function(contact){
            facilityApi.contacts.create(
                facilityApi.utils.cleanFormData(contact))
            .success(function(data){
                var facilityContact = {
                    contact: data.id,
                    facility: $scope.facility.id
                };
                facilityApi.facility_contacts.create(facilityContact)
                .success(function(){
                    $scope.contact = {
                        name: "",
                        contact_type: ""
                    };
                    $scope.$emit("silGrid.data.refresh");
                }).error(function(error){
                    $scope.alert = facilityApi.utils.getError(error);
                });
            }).error(function(error){
                $scope.alert = facilityApi.utils.getError(error);
            });
        };
    }])
    .controller("mfl.facilities.controllers.create.services", ["$scope",
     "$stateParams", "$state", "mfl.facilities.wrappers",
    function($scope, $stateParams, $state,facilityApi){
        facilityApi.utils.createLock($stateParams, $state);
        $scope.facility= {
            id : $stateParams.facilityId
        };
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
