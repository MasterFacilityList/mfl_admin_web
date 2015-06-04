(function(angular){
    "use strict";
    angular.module("mfl.setup.constituency.controllers",[
        "mfl.setup.api"
    ])

    .controller("mfl.setup.controller.constituency.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "View Constituencies"
                }
            ];
        }]
    );

})(angular);
