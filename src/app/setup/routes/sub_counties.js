(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.sub_counties", ["mfl.setup.routes.dashboard"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.sub_counties", {
                url: "/sub_counties",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.sub_counties": {
                        controller: "mfl.setup.controller.sub_counties.list",
                        templateUrl: "setup/tpls/sub_counties/sub_counties.tpl.html"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_national,is_staff"
            })
            .state("setup.sub_counties.edit", {
                url: "/details/:scount_id",
                views: {
                    "main-content@setup.sub_counties": {
                        templateUrl: "setup/tpls/sub_counties/sub_counties.details.tpl.html",
                        controller :"mfl.setup.controller.sub_counties.edit"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_national,is_staff"
            })
            .state("setup.sub_counties.create", {
                url: "/create",
                views: {
                    "main-content@setup.sub_counties": {
                        templateUrl: "setup/tpls/sub_counties/sub_counties.details.tpl.html",
                        controller :"mfl.setup.controller.sub_counties.edit"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_national,is_staff"
            });
    }]);

})(window.angular);
