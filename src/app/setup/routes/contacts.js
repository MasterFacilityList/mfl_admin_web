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
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.list",
                        templateUrl: "setup/tpls/contacts/contacts-list.tpl.html"
                    }
                }
            })
        .state("setup.contacts.view", {
                url: "/:id",
                views: {
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.view",
                        templateUrl: "setup/tpls/contacts/contacts-view.tpl.html"
                    }
                }
            })
        .state("setup.contacts.create", {
                url: "/create",
                views: {
                    "main-content@setup.contacts": {
                        controller: "mfl.setup.controller.contacts.view",
                        templateUrl: "setup/tpls/contacts/contacts-view.tpl.html"
                    }
                }
            });
    }]);
})(angular);

