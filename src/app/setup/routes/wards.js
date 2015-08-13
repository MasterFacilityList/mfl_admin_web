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
                permission: "common.view_ward",
                userFeature: "is_national"
            })
            .state("setup.wards.edit", {
                url: "/view/:ward_id",
                views: {
                    "main-content@setup.wards": {
                        controller: "mfl.setup.controller.ward.edit",
                        templateUrl: "setup/tpls/wards/edit_ward.tpl.html"
                    }
                },
                permission: "common.view_ward",
                userFeature: "is_national"
            })
            .state("setup.wards.create", {
                url: "/new",
                views: {
                    "main-content@setup.wards": {
                        controller: "mfl.setup.controller.ward.edit",
                        templateUrl: "setup/tpls/wards/edit_ward.tpl.html"
                    }
                },
                permission: "common.view_ward",
                userFeature: "is_national"
            });
    }]);
})(window.angular);
