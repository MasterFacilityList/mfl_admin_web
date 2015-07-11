(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.contacts", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        /*Contacts*/

        .state("setup.contacts", {
                url: "/contacts",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.list",
                        templateUrl: "setup/tpls/contacts/contacts-list.tpl.html"
                    }
                },
                permission: "common.view_contact",
                userFeature: "is_national,is_national"
            })
        .state("setup.contacts.edit", {
                url: "/:id/edit",
                views: {
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.edit",
                        templateUrl: "setup/tpls/contacts/contacts-edit.tpl.html"
                    }
                },
                permission: "common.view_contact",
                userFeature: "is_national,is_national"
            })
        .state("setup.contacts.edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.contacts.edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.setup.controller.contacts.edit"
                    }
                },
                permission: "common.delete_contact",
                userFeature: "is_staff,is_national"
            })
        .state("setup.contacts.create", {
                url: "/create",
                views: {
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.edit",
                        templateUrl: "setup/tpls/contacts/contacts-edit.tpl.html"
                    }
                },
                permission: "common.add_contact",
                userFeature: "is_staff,is_national"
            })

        /*Contact Types*/

        .state("setup.contact_types", {
                url: "/contact-types",
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
                userFeature: "is_national"
            })
        .state("setup.contact_types.view", {
                url: "/:id",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                },
                permission: "common.view_contacttype",
                userFeature: "is_national"
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
})(angular);
