(function(angular){
    "use strict";

    /**
     * @ngdoc module
     * @name mfl.setup.controllers
     * @description Combines all setup controllers into one module
     */
    angular.module("mfl.setup.controllers",[
        "mfl.setup.county.controllers",
        "mfl.setup.constituency.controllers",
        "mfl.setup.sub_counties.controllers",
        "mfl.setup.keph.controllers",
        "mfl.setup.ward.controllers",
        "mfl.setup.contacts.controllers",
        "mfl.setup.town.controllers",
        "mfl.setup.chu.controllers",
        "mfl.setup.gis.controllers",
        "mfl.setup.controllers.documents",
        "mfl.setup.api"
    ])
    /**
     * @ngdoc controller
     * @name mfl.setup.controller.dashboard
     * @description Controls the 'homepage' of system setup
     */
    .controller("mfl.setup.controller.dashboard", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Administrative Units"
            };
        }]);

})(window.angular);
