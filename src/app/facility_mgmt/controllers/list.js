(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.list", [])

    .controller("mfl.facility_mgmt.controllers.facility_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "Facility Management"
            };
        }]
    );

})(angular);
