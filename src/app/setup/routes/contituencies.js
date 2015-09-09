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
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            })
            .state("setup.constituencies.view_const", {
                url: "/details/:const_id",
                views: {
                    "main-content@setup.constituencies": {
                        templateUrl: "setup/tpls/constituencies/constituency.details.tpl.html",
                        controller :"mfl.setup.controller.constituency.details"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            })
            .state("setup.constituencies.create", {
                url: "/create",
                views: {
                    "main-content@setup.constituencies": {
                        templateUrl: "setup/tpls/constituencies/create_constituency.tpl.html",
                        controller :"mfl.setup.controller.constituency.create"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            });
    }]);

})(window.angular);
