(function (angular) {

    angular.module("mfl.service_mgmt.controllers.base", [])

    .controller("mfl.service_mgmt.controllers.main", ["$scope","$state",
        function($scope,$state){
        $scope.tooltip = {
            "title": "tooltip",
            "checked": false
        };
        $scope.edit_view = (($state.current.name).indexOf("edit") > -1);

    }])

    .controller("mfl.service_mgmt.controllers.main.toc", [angular.noop]);

})(angular);
