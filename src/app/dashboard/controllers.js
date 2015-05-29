(function (angular) {

    "use strict";

    angular.module("mfl.dashboard.controllers", [])

    .controller("mfl.dashboard.home", ["$scope",
        function ($scope) {
            $scope.user = "Antony";
            $scope.test = "Manage dashboard";
            $scope.path = [
                {
                    name: "dashboard",
                    route: "dashboard"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-user",
                    name: "dashboard"
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
        }
    ])
    .controller("mfl.dashboard.content", ["$scope", 
        function ($scope) {
            $scope.test = "cool";
        }
    ]);

})(angular);