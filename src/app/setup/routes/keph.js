(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.keph", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("setup.kephs", {
                url: "/keph",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.kephs": {
                        controller: "mfl.setup.controller.keph.list",
                        templateUrl: "setup/tpls/keph/keph.tpl.html"
                    }
                },
                permission: "facilities.view_kephlevel",
                userFeature: "is_staff,is_national"
            })
            .state("setup.kephs.keph_edit", {
                url: "/edit/:keph_id",
                views: {
                    "main-content@setup.keph": {
                        controller: "mfl.setup.controller.keph.edit",
                        templateUrl: "setup/tpls/keph/keph.edit.tpl.html"
                    }
                },
                permission: "facilities.change_kephlevel",
                userFeature: "is_staff,is_national"
            })
            .state("setup.kephs.keph_edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.keph.keph_edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.setup.controller.keph.edit"
                    }
                },
                permission: "facilities.delete_kephlevel",
                userFeature: "is_staff,is_national"
            })
            .state("setup.kephs.keph_create", {
                url: "/create",
                views: {
                    "main-content@setup.keph": {
                        controller: "mfl.setup.controller.keph.create",
                        templateUrl: "setup/tpls/keph/keph.edit.tpl.html"
                    }
                },
                permission: "facilities.add_kephlevel",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
