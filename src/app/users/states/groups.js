(function (angular) {
    "use strict";

    angular.module("mfl.users.states.groups", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("groups", {
                url: "/groups/",
                views: {
                    "main": {
                        templateUrl: "users/tpls/main.tpl.html"
                    },
                    "header@groups": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "sidebar@groups": {
                        templateUrl: "users/tpls/side_nav.tpl.html"
                    },
                    "main-content@groups": {
                        controller: "mfl.users.controllers.group_list",
                        templateUrl: "users/tpls/groups.list.tpl.html"
                    }
                },
                data : { pageTitle: "Groups" }
            })

            .state("groups.group_list", {
                url: "groups/",
                views: {
                    "main-content@groups": {
                        controller: "mfl.users.controllers.group_list",
                        templateUrl: "users/tpls/groups.grid.tpl.html"
                    }
                }
            })

            .state("groups.group_create", {
                url: "create/",
                views: {
                    "main-content@groups": {
                        controller: "mfl.users.controllers.group_create",
                        templateUrl: "users/tpls/groups.edit.tpl.html"
                    }
                }
            })

            .state("groups.group_edit", {
                url: "edit/:group_id/",
                views: {
                    "main-content@groups": {
                        controller: "mfl.users.controllers.group_edit",
                        templateUrl: "users/tpls/groups.edit.tpl.html"
                    }
                }
            })

            .state("groups.group_delete", {
                url: "delete/:group_id/",
                views: {
                    "main-content@groups": {
                        controller: "mfl.users.controllers.group_delete",
                        templateUrl: "users/tpls/groups.delete.tpl.html"
                    }
                }
            });
    }]);

})(angular);
