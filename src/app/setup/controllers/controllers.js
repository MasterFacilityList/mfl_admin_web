(function(angular){
    "use strict";
    angular.module("mfl.setup.controllers",[
        "mfl.setup.county.controllers",
        "mfl.setup.constituency.controllers",
        "mfl.setup.ward.controllers",
        "mfl.setup.contacts.controllers",
        "mfl.setup.town.controllers",
        "mfl.setup.chu.controllers",
        "mfl.setup.gis.controllers"
    ])
    .controller("mfl.setup.controller.dashboard", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "Adminstrative Units"
                }
            ];
            $scope.collapsed = {
                one: true
            };
        }]);
})(angular);

