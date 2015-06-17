(function (angular) {
    "use strict";

    angular.module("mfl.users.states.users", ["ui.router"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("users", {
                url: "/users/",
                views: {
                    "main": {
                        templateUrl: "users/tpls/main.tpl.html"
                    },
                    "header@users": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "body@users": {
                        controller : "mfl.common.controller.stateUsers"
                    },
                    "main-content@users": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/users.grid.tpl.html"
                    }
                },
                data : { pageTitle: "Users" }
            })

            .state("users.user_list", {
                url: "list/",
                views: {
                    "body@users" : {
                        templateUrl : "users/tpls/body.tpl.html"
                    },
                    "main-content@users.user_list": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/users.grid.tpl.html"
                    }
                }
            })

            .state("users.user_list.user_create", {
                url: "create/",
                views: {
                    "main-content@users.user_list": {
                        controller: "mfl.users.controllers.user_create",
                        templateUrl: "users/tpls/users.edit.tpl.html"
                    }
                },
                permission: "users.add_mfluser"
            })

            .state("users.user_list.user_create.basic", {
                url: "basic/",
                views: {
                    "form-view@users.user_list.user_create": {
                        controller: "mfl.users.controllers.user_create.basic",
                        templateUrl: "users/tpls/users.edit.basic.tpl.html"
                    }
                },
                permission: "users.add_mfluser"
            })

            .state("users.user_list.user_edit", {
                url: "edit/:user_id/",
                views: {
                    "main-content@users.user_list": {
                        controller: "mfl.users.controllers.user_edit",
                        templateUrl: "users/tpls/users.edit.tpl.html"
                    }
                }
            })

            .state("users.user_list.user_edit.basic", {
                url: "basic/",
                views: {
                    "form-view@users.user_list.user_edit": {
                        controller: "mfl.users.controllers.user_edit.basic",
                        templateUrl: "users/tpls/users.edit.basic.tpl.html"
                    }
                }
            })

            .state("users.user_list.user_edit.contacts", {
                url: "contacts/",
                views: {
                    "form-view@users.user_list.user_edit": {
                        controller: "mfl.users.controllers.user_edit.contacts",
                        templateUrl: "users/tpls/users.edit.contacts.tpl.html"
                    }
                }
            })

            .state("users.user_list.user_edit.groups", {
                url: "groups/",
                views: {
                    "form-view@users.user_list.user_edit": {
                        controller: "mfl.users.controllers.user_edit.groups",
                        templateUrl: "users/tpls/users.edit.groups.tpl.html"
                    }
                }
            })

            .state("users.user_list.user_edit.counties", {
                url: "counties/",
                views: {
                    "form-view@users.user_list.user_edit": {
                        controller: "mfl.users.controllers.user_edit.counties",
                        templateUrl: "users/tpls/users.edit.counties.tpl.html"
                    }
                }
            })

            .state("users.user_list.user_delete", {
                url: "delete/:user_id/",
                views: {
                    "main-content@users.user_list": {
                        controller: "mfl.users.controllers.user_delete",
                        templateUrl: "users/tpls/users.delete.tpl.html"
                    }
                },
                permission: "users.delete_mfluser"
            })

            .state("users.group_list", {
                url: "groups/",
                views: {
                    "body@users" : {
                        templateUrl : "users/tpls/body.tpl.html"
                    },
                    "main-content@users.group_list": {
                        controller: "mfl.users.controllers.group_list",
                        templateUrl: "users/tpls/groups.grid.tpl.html"
                    }
                }
            });
    }]);

})(angular);
