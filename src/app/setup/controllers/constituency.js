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
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Add new constituency",
                    icon: "fa-plus"
                }
            ];
        }]
    );

})(angular);
