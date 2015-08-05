(function (angular) {

    "use strict";

    angular.module("mfl.reports.controllers.facilities", [])

    .controller("mfl.reports.controllers.facilities", ["$scope",
        function($scope){
        $scope.tooltip = {
            "title": "tooltip",
            "checked": false
        };
        $scope.filters = {
            "rejected": false,
            "fields": "id,code,name,facility_type_name,owner_name,county,"+
                      "sub_county,constituency,ward_name,updated"
        };
        $scope.toggle = false;

    }]);
})(window.angular);
