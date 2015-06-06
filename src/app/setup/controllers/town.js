(function(angular){
    "use strict";
    angular.module("mfl.setup.town.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.town.list", ["$scope",
        function ($scope) {
            $scope.test = "View administrative area";
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "Towns"
                }
            ];
        }]
    );
})(angular);
