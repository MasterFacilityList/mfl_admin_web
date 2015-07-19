(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.towns", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.towns", {
                url: "/towns",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.list",
                        templateUrl: "setup/tpls/towns/towns.tpl.html"
                    }
                },
                permission: "common.view_town",
                userFeature: "is_national"
            })
            .state("setup.towns.town_edit", {
                url: "/edit/:town_id",
                views: {
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.edit",
                        templateUrl: "setup/tpls/towns/towns.edit.tpl.html"
                    }
                },
                permission: "common.view_town",
                userFeature: "is_national"
            })
            .state("setup.towns.town_edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.towns.town_edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.setup.controller.town.edit"
                    }
                },
                permission: "common.delete_town",
                userFeature: "is_staff,is_national"
            })
            .state("setup.towns.town_create", {
                url: "/create",
                views: {
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.create",
                        templateUrl: "setup/tpls/towns/towns.edit.tpl.html"
                    }
                },
                permission: "common.add_town",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
