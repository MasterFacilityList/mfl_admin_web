(function (angular) {
    "use strict";

    angular.module("mfl.users.states.users", ["ui.router"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("users", {
                url: "/users/",
                views: {
                    "main": {
                        controller: "mfl.users.controllers.home",
                        templateUrl: "users/tpls/main.tpl.html"
                    },
                    "header@users": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "sidebar@users": {
                        templateUrl: "users/tpls/side_nav.tpl.html"
                    },
                    "main-content@users": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/users.grid.tpl.html"
                    }
                },
                data : { pageTitle: "Users" }
            })

            .state("users.user_create", {
                url: "create/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_create.basic", {
                url: "basic/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_create.contacts", {
                url: "contacts/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_create.groups", {
                url: "groups/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_edit", {
                url: "edit/:user_id/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_edit.basic", {
                url: "basic/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_edit.contacts", {
                url: "contacts/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_edit.groups", {
                url: "groups/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            })

            .state("users.user_delete", {
                url: "delete/:user_id/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/users.create.tpl.html"
                    }
                }
            });
    }]);

})(angular);
