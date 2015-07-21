(function(angular){
    "use strict";
    angular.module("mfl.setup.controllers",[
        "mfl.setup.county.controllers",
        "mfl.setup.constituency.controllers",
        "mfl.setup.categories.controllers",
        "mfl.setup.services.controllers",
        "mfl.setup.options.controllers",
        "mfl.setup.categories.controllers",
        "mfl.setup.keph.controllers",
        "mfl.setup.ward.controllers",
        "mfl.setup.contacts.controllers",
        "mfl.setup.town.controllers",
        "mfl.setup.chu.controllers",
        "mfl.setup.gis.controllers",
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.dashboard", ["$scope","currentStateOpen","$state",
        function ($scope,curStateService,$state) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Adminstrative Units"
            };
            $scope.edit_view = (($state.current.name).indexOf("edit") > -1);
            $scope.collapsed = curStateService.whichTab();
        }]);
})(window.angular);
