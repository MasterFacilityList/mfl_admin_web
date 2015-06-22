(function (angular) {
    "use strict";

    angular.module("mfl.users.states.users", ["ui.router"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("users", {
                parent: "usermgmt",
                url: "^/users/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.user_list",
                        templateUrl: "users/tpls/users.grid.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_create", {
                url: "create/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.user_create",
                        templateUrl: "users/tpls/user.create.tpl.html"
                    }
                },
                permission: "users.add_mfluser"
            })

            .state("users.user_create.basic", {
                url: "basic/",
                views: {
                    "form-view@users.user_create": {
                        controller: "mfl.users.controllers.user_create.basic",
                        templateUrl: "users/tpls/users.edit.basic.tpl.html"
                    }
                },
                permission: "users.add_mfluser"
            })
            .state("users.user_create.contacts", {
                url: ":user_id/contacts/",
                views: {
                    "form-view@users.user_create": {
                        controller: "mfl.users.controllers.user_edit.contacts",
                        templateUrl: "users/tpls/users.edit.contacts.tpl.html"
                    }
                },
                permission: "users.add_mfluser"
            })
            .state("users.user_create.groups", {
                url: ":user_id/groups/",
                views: {
                    "form-view@users.user_create": {
                        controller: "mfl.users.controllers.user_edit.groups",
                        templateUrl: "users/tpls/users.edit.groups.tpl.html"
                    }
                }
            })

            .state("users.user_create.counties", {
                url: ":user_id/counties/",
                views: {
                    "form-view@users.user_create": {
                        controller: "mfl.users.controllers.user_edit.counties",
                        templateUrl: "users/tpls/users.edit.counties.tpl.html"
                    }
                }
            })

            .state("users.user_create.details", {
                url: ":user_id/confirm/",
                views: {
                    "form-view@users.user_create": {
                        controller : "mfl.users.controllers.user_create.details",
                        templateUrl: "users/tpls/users.create.details.tpl.html"
                    }
                }
            })

            .state("users.user_edit", {
                url: "edit/:user_id/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.user_edit",
                        templateUrl: "users/tpls/users.edit.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_edit.delete", {
                url: "delete/",
                views: {
                    "delete@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "users.delete_mfluser"
            })

            .state("users.user_edit.basic", {
                url: "basic/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.basic",
                        templateUrl: "users/tpls/users.edit.basic.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_edit.contacts", {
                url: "contacts/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.contacts",
                        templateUrl: "users/tpls/users.edit.contacts.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_edit.groups", {
                url: "groups/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.groups",
                        templateUrl: "users/tpls/users.edit.groups.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_edit.counties", {
                url: "counties/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.counties",
                        templateUrl: "users/tpls/users.edit.counties.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_edit.constituency", {
                url: "constituency/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.constituency",
                        templateUrl: "users/tpls/users.edit.constituencies.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_edit.regulatory_body", {
                url: "regulatory_body/",
                views: {
                    "form-view@users.user_edit": {
                        controller: "mfl.users.controllers.user_edit.regulatory_body",
                        templateUrl: "users/tpls/users.edit.regulatory_body.tpl.html"
                    }
                },
                permission: "users.view_mfluser"
            })

            .state("users.user_delete", {
                url: "delete/:user_id/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.user_delete",
                        templateUrl: "users/tpls/users.delete.tpl.html"
                    }
                },
                permission: "users.delete_mfluser"
            });
    }]);

})(angular);
