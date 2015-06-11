(function(angular){
    "use strict";
    angular.module("mfl.setup.county.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.county.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "Counties"
                }
            ];
        }]
    );

})(angular);
