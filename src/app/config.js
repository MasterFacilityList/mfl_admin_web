"use strict";
angular.module("mflAppConfig", ["mfl.auth.permissions",
    "sil.grid", "mfl.auth.services"])

    .config(["silGridConfigProvider", function(silGridConfig){
        silGridConfig.apiMaps = {
                practitioners: ["mfl.practitioners.wrapper", "practitionersApi"],
                facilities : ["mfl.facilities.wrapper",
                    "facilitiesApi"],
                chul: ["mfl.chul.wrapper", "chulApi"],
                officers: ["mfl.officers.wrapper", "officersApi"],
                admin: ["mfl.setup.api", "adminApi"],
                owners: ["mfl.facilities.wrapper", "ownersApi"],
                users : ["mfl.users.wrapper", "usersApi"],
                roles : ["mfl.users.wrapper","rolesApi"],
                permissions : ["mfl.users.wrapper", "permissionsApi"],
                contactsApi : ["mfl.users.wrapper", "contactsApi"],
                contact_type : ["mfl.users.wrapper", "contact_typeApi"],
                user_contacts : ["mfl.users.wrapper", "user_contactsApi"]
            };
        silGridConfig.appConfig = "mfl.settings";
    }])

    .config(["loggingConfigProvider", function(loggingConfig){
        loggingConfig.LOG_TO_SERVER = false;
        loggingConfig.LOG_SERVER_URL = undefined;
        loggingConfig.LOG_TO_CONSOLE = true;
    }])

    .run(["mfl.auth.services.login","$state",
        function (authService, $state) {
            if(!authService.isLoggedIn()) {
                $state.go("login");
            }

        }
    ])
    .run(["$rootScope","$state","mfl.auth.services.login",
        "mfl.auth.permissions.permissionList",
        function ($rootScope,$state, authService, permissionService) {
            $rootScope.$on("$stateChangeStart", function () {
                if(!authService.isLoggedIn()){
                    $state.go("login");
                }
                else{
                    $rootScope.current_user = authService.getUser();
                    var permissionList =
                        $rootScope.current_user.all_permissions;
                    permissionService.setPermissions(permissionList);
                    //console.log(permissionList);
                }
            });
        }
    ]);

