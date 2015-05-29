(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.wards", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.wards", {
                url: "/wards",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.ward.list",
                        templateUrl: "setup/tpls/wards/wards.tpl.html"
                    }
                }
            });
    }]);
})(angular);
