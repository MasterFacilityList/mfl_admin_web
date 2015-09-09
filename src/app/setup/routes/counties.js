(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.counties", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.counties", {
                url: "/counties",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.counties": {
                        controller: "mfl.setup.controller.county.list",
                        templateUrl: "setup/tpls/counties/counties.tpl.html"
                    }
                },
                permission: "common.view_county",
                userFeature: "is_staff,is_national"
            })
            .state("setup.counties.create", {
                url: "/new",
                views: {
                    "main-content@setup.counties": {
                        controller: "mfl.setup.controller.county.create",
                        templateUrl: "setup/tpls/counties/create_county.tpl.html"
                    }
                },
                permission: "common.view_county",
                userFeature: "is_staff,is_national"
            })
            .state("setup.counties.view_consts", {
                url: "/:count_id",
                views: {
                    "main-content@setup.counties": {
                        controller: "mfl.setup.controller.county.view",
                        templateUrl: "setup/tpls/counties/edit_county.tpl.html"
                    }
                },
                permission: "common.view_county",
                userFeature: "is_staff,is_national"
            })
            .state("setup.counties.view_consts.constituencies", {
                url: "/constituencies",
                views: {
                    "form-view@setup.counties.view_consts" : {
                        templateUrl: "setup/tpls/counties/constituencies.tpl.html"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            })
            .state("setup.counties.view_consts.users", {
                url: "/users",
                views: {
                    "form-view@setup.counties.view_consts" : {
                        templateUrl: "setup/tpls/counties/users-list.tpl.html"
                    }
                },
                permission: "common.view_usercounty",
                userFeature: "is_staff,is_national"
            });
    }]);

})(window.angular);
