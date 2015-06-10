(function(angular){
    "use strict";
    angular.module("mfl.facilities.controllers.home", [
        "mfl.facilities.services"
    ])
    .controller("mfl.facilities.controllers.home.list", ["$scope", function($scope){
        console.log("at home controller");
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-building",
                name: "Manage Facilities"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.create.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-user-plus"
            }
        ];
    }]);
})(angular);
