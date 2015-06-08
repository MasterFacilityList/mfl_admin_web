(function (angular) {
    "use strict";

    angular.module("mfl.users.states.profile", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("profile", {
                url: "/profile/",
                views: {
                    "main": {
                        controller: "mfl.users.controllers.profile.base",
                        templateUrl: "users/tpls/main.tpl.html"
                    },
                    "header@profile": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "sidebar@profile": {
                        templateUrl: "users/tpls/profile.side_nav.tpl.html"
                    },
                    "main-content@profile": {
                        controller: "mfl.users.controllers.profile.basic",
                        templateUrl: "users/tpls/profile.container.tpl.html"
                    }
                },
                data : { pageTitle: "Basic Profile" }
            })

            .state("profile.basic", {
                url: "basic/",
                views: {
                    "main-content@profile": {
                        controller: "mfl.users.controllers.profile.basic",
                        templateUrl: "users/tpls/profile.basic.tpl.html"
                    }
                }
            })

            .state("profile.contacts", {
                url: "contacts/",
                views: {
                    "main-content@profile": {
                        controller: "mfl.users.controllers.profile.contacts",
                        templateUrl: "users/tpls/profile.contacts.tpl.html"
                    }
                },
                data : { pageTitle: "Contacts" }
            })

            .state("profile.password", {
                url: "password/",
                views: {
                    "main-content@profile": {
                        controller: "mfl.users.controllers.profile.password",
                        templateUrl: "users/tpls/profile.password.tpl.html"
                    }
                },
                data : { pageTitle: "Change Password" }
            });
    }]);

})(angular);
