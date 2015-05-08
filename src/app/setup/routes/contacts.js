"use strict";
(function(angular){
    angular.module("mfl.setup.routes.contacts", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.contacts", {
                url: "/contacts",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.contacts.list",
                        templateUrl: "setup/tpls/contacts/contacts-list.tpl.html"
                    }
                }
            });
    }]);
})(angular);

