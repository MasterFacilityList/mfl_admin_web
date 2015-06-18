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
                }
            })
        .state("setup.contacts.edit", {
                url: "/:id/edit",
                views: {
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.edit",
                        templateUrl: "setup/tpls/contacts/contacts-edit.tpl.html"
                    }
                }
            })
        .state("setup.contacts.edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.contacts.edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.setup.controller.contacts.edit"
                    }
                }
            })
        .state("setup.contacts.create", {
                url: "/create",
                views: {
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.edit",
                        templateUrl: "setup/tpls/contacts/contacts-edit.tpl.html"
                    }
                }
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
                }
            })
        .state("setup.contact_types.view", {
                url: "/:id",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                }
            })
        .state("setup.contact_types.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.contact_types.view": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                }
            })
        .state("setup.contact_types.create", {
                url: "/create",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                }
            });
    }]);
})(angular);

