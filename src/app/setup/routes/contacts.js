(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.contacts", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.contact_types", {
                url: "/contact_types",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.list",
                        templateUrl: "setup/tpls/contacts/contact-types-list.tpl.html"
                    }
                },
                permission: "common.view_contacttype",
                userFeature: "is_staff,is_national"
            })
        .state("setup.contact_types.view", {
                url: "/edit/:id",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                },
                permission: "common.view_contacttype",
                userFeature: "is_staff,is_national"
            })
        .state("setup.contact_types.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.contact_types.view": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "common.delete_contacttype",
                userFeature: "is_staff,is_national"
            })
        .state("setup.contact_types.create", {
                url: "/create",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                },
                permission: "common.add_contacttype",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
