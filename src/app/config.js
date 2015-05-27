(function (angular) {

    "use strict";

    angular.module("mflAppConfig", [
        "mfl.auth.permissions",
        "sil.grid",
        "mfl.auth.services",
        "ngCookies",
        "sil.api.wrapper",
        "mfl.common.providers"
    ])

    .constant("SERVER_URL", "http://mfl.azure.slade360.co.ke/")

    .config(["SERVER_URL", "apiConfigProvider",
        function(SERVER_URL, apiConfig){
            apiConfig.SERVER_URL = SERVER_URL;
        }
    ])

    .run(["$http", "$cookies", function ($http, $cookies) {
        // apparently the angular doesn"t do CSRF headers using
        // CORS across different domains thereby this hack
        var csrftoken = $cookies.csrftoken;
        var header_name = "X-CSRFToken";
        $http.defaults.headers.common[header_name] = csrftoken;
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true
            }
        });
    }])

    .config(["$httpProvider",function ($httpProvider) {
        $httpProvider.interceptors.push("myCSRF");
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = {
            "Content-Type":"application/json",
            "Accept" : "application/json, */*"
        };

    }])

    // avoid silent failures in angular
    .config(["$provide", function($provide) {
        $provide.decorator("$exceptionHandler", function($delegate, $injector) {
            return function(exception, cause) {
                var $log = $injector.get("$log");
                $log.error(exception, cause);
            };
        });
    }])

    .config(["silGridConfigProvider", function(silGridConfig){
        silGridConfig.apiMaps = {
                practitioners: ["mfl.practitioners.wrapper", "practitionersApi"],
                facilities : ["mfl.facilities.wrapper", "facilitiesApi"],
                chul: ["mfl.chul.wrapper", "chulApi"],
                officers: ["mfl.officers.wrapper", "officersApi"],
                admin: ["mfl.setup.api", "adminApi"],
                owners: ["mfl.facilities.wrapper", "ownersApi"],
                users : ["mfl.users.wrapper", "usersApi"],
                roles : ["mfl.users.wrapper","rolesApi"],
                permissions : ["mfl.users.wrapper", "permissionsApi"],
                contactsApi : ["mfl.users.wrapper", "contactsApi"],
                contact_type : ["mfl.users.wrapper", "contact_typeApi"],
                user_contacts : ["mfl.users.wrapper", "user_contactsApi"],
                service_mgmt: ["mfl.service_mgmt.services", "mfl.service_mgmt.wrappers"]
            };
        silGridConfig.appConfig = "mflAppConfig";
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

})(angular);
