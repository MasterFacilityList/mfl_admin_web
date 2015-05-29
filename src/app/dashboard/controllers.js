(function (angular) {

    "use strict";

    angular.module("mfl.dashboard.controllers", [])

    .controller("mfl.dashboard.home", ["$scope",
        function ($scope) {
            $scope.user = "Antony";
            $scope.test = "Manage dashboard";
            $scope.path = [
                {
                    name: "Dashboard",
                    route: "dashboard"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-desktop",
                    name: "dashboard"
                }
            ];
        }
    ])
    .controller("mfl.dashboard.content", ["$scope", 
        function ($scope) {
            $scope.test = "cool";
        }
    ]);

})(angular);