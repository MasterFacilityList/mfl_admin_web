(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.create", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.create.base", ["$scope",
        "safeApply",
        "mfl.facilities.wrappers", function($scope, safeApply,facilityApi){
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
            constituency: []
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
            }
        };

        $scope.events = {
            county: function(value){
                facilityApi.constituencies .filter({county:value.id})
                .success(function(data){
                    $scope.filterData.constituency = data.results;
                    console.log($scope.dataCallback);
                    safeApply($scope);
                }).error(function(error){
                    $scope.alert = error.err;
                });
            }
        };

        // $scope.facility = {id: 1};
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
