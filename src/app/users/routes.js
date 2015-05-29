(function (angular) {
    "use strict";

    angular.module("mfl.users.routes", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("users", {
                url: "/users",
                views: {
                    "main": {
                        controller: "mfl.users.controllers.home",
                        templateUrl: "users/tpls/main.tpl.html"
                    },
                    "header@users": {
                        controller: "mfl.users.controllers.home",
                        templateUrl: "users/tpls/header.tpl.html"
                    },
                    "sidebar@users": {
                        templateUrl: "users/tpls/side_nav.tpl.html"
                    },
                    "main-content@users": {
                        controller: "mfl.users.controllers.home",
                        templateUrl: "users/tpls/user_index.tpl.html"
                    }
                },
                data : { pageTitle: "Users" }
            })
            .state("users.manage_permissions", {
                url : "/permissions",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.permissions",
                        templateUrl: "users/tpls/permissions_index.tpl.html"
                    }
                },
                data : { pageTitle: "Roles" }
            })
            .state("users.manage_roles", {
                url: "/roles",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.role",
                        templateUrl: "users/tpls/role_index.tpl.html"
                    }
                },
                data : { pageTitle: "Roles" }
            })
            .state("users.new_role", {
                url : "/newrole",
                views : {
                    "main-content@users": {
                        controller: "mfl.users.controllers.new_role",
                        templateUrl: "users/tpls/new_role.tpl.html"
                    }
                }
            })
            .state("users.manage_users", {
                url: "/users",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.users",
                        templateUrl: "users/tpls/index.tpl.html"
                    }
                },
                data : { pageTitle: "Users" }
            })
            .state("users.new_user", {
                url: "/newuser",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.new_user",
                        templateUrl: "users/tpls/new_user.tpl.html"
                    }
                }
            })
            //child states for adding a new facility
            .state("users.new_user.basic", {
                url: "/basicuserdetails",
                views: {
                    "form-view@users.new_user" : {
                        templateUrl : "users/tpls/basic_details.tpl.html"
                    }
                }
            })
            .state("users.new_user.contacts", {
                url : "/contactinformation/:user_id",
                views: {
                    "form-view@users.new_user" : {
                        templateUrl : "users/tpls/contact_inforamtion.tpl.html"
                    }
                }
            })
            .state("users.new_user.groups", {
                url : "/assignrole/:user_id",
                views: {
                    "form-view@users.new_user" : {
                        templateUrl : "users/tpls/user_group.tpl.html"
                    }
                }
            })
            .state("users.edit_user", {
                url: "/edituser/:user_id",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.edit_user",
                        templateUrl: "users/tpls/new_user.tpl.html"
                    }
                }
            })
            .state("users.view_user", {
                url: "/viewuser/:user_id",
                views: {
                    "main-content@users": {
                        controller: "mfl.users.controllers.view_user",
                        templateUrl: "users/tpls/view_user.tpl.html"
                    }
                }
            });
    }]);
})(angular);
