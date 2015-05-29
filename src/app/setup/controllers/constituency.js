(function(angular){
    "use strict";
    angular.module("mfl.setup.constituency.controllers",[
        "mfl.setup.api"
    ])

    .controller("mfl.setup.controller.constituency.list", ["$scope",
        function ($scope) {
            $scope.path = [
                {
                    name: "Adminstrative area",
                    route: "admin_units"
                },
                {
                    name: "Constituencies",
                    route: "admin_units.constituencies"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "View Constituencies"
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
        }]
    );

})(angular);
