(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.contacts", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.contacts", {
                url: "/contacts",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contacts.list",
                        templateUrl: "setup/tpls/contacts/contact-types-list.tpl.html"
                    }
                }
            })
        .state("setup.contacts.view", {
                url: "/:id",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contacts.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                }
            })
        .state("setup.contacts.create", {
                url: "/create",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contacts.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                }
            })
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

