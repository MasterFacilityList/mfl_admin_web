(function (angular) {
    "use strict";

    angular.module("mfl.users.states.groups", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("groups", {
                parent: "usermgmt",
                url: "^/groups/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.group_list",
                        templateUrl: "users/tpls/groups.grid.tpl.html"
                    }
                }
            })

            .state("groups.group_create", {
                url: "create/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.group_create",
                        templateUrl: "users/tpls/groups.edit.tpl.html"
                    }
                },
                permission: "auth.add_group"
            })

            .state("groups.group_edit", {
                url: "edit/:group_id/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.group_edit",
                        templateUrl: "users/tpls/groups.edit.tpl.html"
                    }
                }
            })

            .state("groups.group_delete", {
                url: "delete/:group_id/",
                views: {
                    "main-content@usermgmt": {
                        controller: "mfl.users.controllers.group_delete",
                        templateUrl: "users/tpls/groups.delete.tpl.html"
                    }
                },
                permission: "auth.delete_group"
            });
    }]);

})(angular);
