(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.constituencies", ["mfl.setup.routes.dashboard"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.constituencies", {
                url: "/constituencies",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.constituencies": {
                        controller: "mfl.setup.controller.constituency.list",
                        templateUrl: "setup/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            })
            .state("setup.constituencies.view_wards", {
                url: "/wards/:const_id",
                views: {
                    "main-content@setup": {
                        templateUrl: "setup/tpls/wards/wards.tpl.html"
                    }
                }
            })
            .state("setup.constituencies.edit", {
                url: "/edit/:const_id",
                views: {
                    "main-content@setup": {
                        templateUrl: "admin_units/tpls/constituencies/constituencies.tpl.html"
                    }
                }
            });
    }]);

})(angular);
