"use strict";
(function(angular){
    angular.module("mfl.setup.facilityOwners.controllers",[
        "mfl.setup.facilityOwners.wrapper"
    ])
    .controller("mfl.setup.controller.facilityOwnerType.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Facility Owner Types"
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
    )

    .controller("mfl.setup.controller.facilityOwner.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Facility Owners"
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

