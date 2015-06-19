(function (angular) {

    angular.module("mfl.users.states", [
        "mfl.users.states.users",
        "mfl.users.states.profile",
        "mfl.users.states.groups"
    ])

    .config(["$stateProvider",
        function ($stateProvider) {
            $stateProvider
                .state("usermgmt", {
                    abstract: true,
                    views: {
                        "main": {
                            templateUrl: "users/tpls/main.tpl.html"
                        },
                        "header@usermgmt": {
                            controller: "mfl.common.controllers.header",
                            templateUrl: "common/tpls/header.tpl.html"
                        },
                        "body@usermgmt" : {
                            templateUrl : "users/tpls/body.tpl.html"
                        }
                    },
                    data : { pageTitle: "User Management" }
                });
        }
    ]);

})(angular);
