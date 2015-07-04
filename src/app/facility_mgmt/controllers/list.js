(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.list", [])

    .controller("mfl.facility_mgmt.controllers.facility_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "Facility Management",
                "icon": "fa-building"
            };
            $scope.action = [
                {
                    func : "ui-sref='facilities.facility_create ({furthest : 1})'",
                    class: "action-btn action-btn-primary action-btn-md",
                    tipmsg: "New Facility",
                    icon: "fa-plus"
                }
            ];
        }]
    );

})(angular);
