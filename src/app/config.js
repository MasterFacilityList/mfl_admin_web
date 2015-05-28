(function (angular) {
    "use strict";

    angular.module("mflAppConfig", [
        "mfl.auth.permissions",
        "sil.grid",
        "mfl.auth.services",
        "ngCookies",
        "sil.api.wrapper",
        "mfl.auth.oauth2"
    ])

    .constant("SERVER_URL", "http://localhost:8061/")
    .constant("CREDZ", {
        "client_id": "5O1KlpwBb96ANWe27ZQOpbWSF4DZDm4sOytwdzGv",
        "client_secret": "PqV0dHbkjXAtJYhY9UOCgRVi5BzLhiDxGU91" +
                         "kbt5EoayQ5SYOoJBYRYAYlJl2RetUeDMpSvh" +
                         "e9DaQr0HKHan0B9ptVyoLvOqpekiOmEqUJ6H" +
                         "ZKuIoma0pvqkkKDU9GPv",
        "token_url": "http://localhost:8061/o/token/",
        "revoke_url": "http://localhost:8061/o/revoke_token/"
    })

    .config(["$httpProvider",function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = {
            "Content-Type":"application/json",
            "Accept" : "application/json, */*"
        };

    }])

    .config(["silGridConfigProvider", function(silGridConfig) {
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
                user_contacts : ["mfl.users.wrapper", "user_contactsApi"]
            };
        silGridConfig.appConfig = "mflAppConfig";
    }])

    .run(["$http","$cookies", function ($http, $cookies) {
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
                }
            });
        }
    ])

    .run(["api.oauth2", function (oauth2) {
        var token = oauth2.getToken();
        if (! _.isNull(token)) {
            oauth2.setXHRToken(token);
        }
    }]);

})(angular);
