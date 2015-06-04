(function (angular) {
    "use strict";

    angular.module("mfl.users.states.groups", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("groups", {
                url: "/groups/",
                views: {
                    "main": {
                        controller: "mfl.users.controllers.group_list",
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
                        templateUrl: "users/tpls/group.list.tpl.html"
                    }
                },
                data : { pageTitle: "Roles" }
            });
    }]);

})(angular);
