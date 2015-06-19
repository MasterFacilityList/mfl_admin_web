(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.wards", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.wards", {
                url: "/wards",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.wards": {
                        controller: "mfl.setup.controller.ward.list",
                        templateUrl: "setup/tpls/wards/wards.tpl.html"
                    }
                },
                permission: "common.view_ward"
            });
    }]);
})(angular);
