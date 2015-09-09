(function (angular) {

    "use strict";

    angular.module("mfl.users.states", [
        "mfl.users.states.users",
        "mfl.users.states.profile",
        "mfl.users.states.groups"
    ])

    .config(["$stateProvider",
        function ($stateProvider) {
            $stateProvider
                .state("usermgmt", {
                    url: "/usermgmt",
                    views: {
                        "main": {
                            templateUrl: "common/tpls/main.tpl.html"
                        },
                        "header@usermgmt": {
                            controller: "mfl.common.controllers.header",
                            templateUrl: "common/tpls/header.tpl.html"
                        },
                        "body@usermgmt" : {
                            templateUrl : "users/tpls/body.tpl.html"
                        }
                    },
                    data : { pageTitle: "User Management" },
                    redirectTo: "users",
                    permission: "users.view_mfluser",
                    userFeature: "is_staff"
                });
        }
    ]);

})(window.angular);
