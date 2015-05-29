(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.units", ["mfl.setup.routes.dashboard"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.units", {
                url: "/units",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.ward",
                        templateUrl: "setup/tpls/wards/wards.tpl.html"
                    }
                }
            });
    }]);

})(angular);
