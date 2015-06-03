(function(angular){
    "use strict";
    angular.module("mfl.setup.ward.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.ward.list", ["$scope",
        function ($scope) {
            $scope.test = "View administrative area";
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "Manage Wards"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add new ward",
                    icon: "fa-plus"
                }
            ];
        }]
    );
})(angular);
