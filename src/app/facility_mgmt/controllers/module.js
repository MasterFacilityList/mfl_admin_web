(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers", [])

    .controller("mfl.facility_mgmt.controllers.facility_list", ["$scope", function ($scope) {
        $scope.title = {
            "name": "Facility management"
        };
    }]);

})(angular);
