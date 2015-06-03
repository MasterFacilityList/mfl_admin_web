(function(angular){
    "use strict";
    angular.module("mfl.setup.county.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.county.list", ["$scope",
        function ($scope) {
            $scope.test = "View administrative area";
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "Manage Counties"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add a new county",
                    icon: "fa-plus"
                }
            ];
        }]
    );

})(angular);
