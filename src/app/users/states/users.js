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

            .state("users.user_list", {
                url: "users/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/users.grid.tpl.html"
                    }
                }
            })

            .state("users.user_create", {
                url: "create/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.user_create",
                        templateUrl: "users/tpls/users.edit.tpl.html"
                    }
                }
            })

            .state("users.user_create.basic", {
                url: "basic/",
                views: {
                    "form-view@users.user_create": {
                        controller: "mfl.users.controllers.user_create.basic",
                        templateUrl: "users/tpls/users.edit.basic.tpl.html"
                    }
                }
            })

            .state("users.user_edit", {
                url: "edit/:user_id/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.user_edit",
                        templateUrl: "users/tpls/users.edit.tpl.html"
                    }
                }
            })

            .state("users.user_edit.basic", {
                url: "basic/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.basic",
                        templateUrl: "users/tpls/users.edit.basic.tpl.html"
                    }
                }
            })

            .state("users.user_edit.contacts", {
                url: "contacts/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.contacts",
                        templateUrl: "users/tpls/users.edit.contacts.tpl.html"
                    }
                }
            })

            .state("users.user_edit.groups", {
                url: "groups/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.groups",
                        templateUrl: "users/tpls/users.edit.groups.tpl.html"
                    }
                }
            })

            .state("users.user_edit.counties", {
                url: "counties/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.counties",
                        templateUrl: "users/tpls/users.edit.counties.tpl.html"
                    }
                }
            })

            .state("users.user_delete", {
                url: "delete/:user_id/",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.user_delete",
                        templateUrl: "users/tpls/users.delete.tpl.html"
                    }
                }
            });
    }]);

})(angular);
