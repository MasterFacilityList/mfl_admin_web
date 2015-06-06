(function (angular, _) {
    "use strict";

    angular.module("mflAdminAppConfig", [
        "sil.common.logging",
        "sil.api.wrapper",
        "sil.grid",
        "mfl.auth.oauth2",
        "ui.router",
        "mfl.auth.services"
    ])

    .constant("SERVER_URL", window.MFL_SETTINGS.SERVER_URL)

    .constant("CREDZ", window.MFL_SETTINGS.CREDZ)

    .constant("HOME_PAGE_NAME", "dashboard")

    .config(["loggingConfigProvider", function(loggingConfig){
        loggingConfig.LOG_TO_SERVER = false;
        loggingConfig.LOG_SERVER_URL = undefined;
        loggingConfig.LOG_TO_CONSOLE = true;
    }])

    .config(["silGridConfigProvider", function(silGridConfig){
        silGridConfig.apiMaps = {
            owners: ["mfl.facilities.wrapper", "ownersApi"],
            users : ["mfl.users.services", "mfl.users.services.wrappers"],
            admin: ["mfl.setup.api", "adminApi"],
            facilities: ["mfl.facilities.services","mfl.facilities.wrappers"],
            service_mgmt: ["mfl.service_mgmt.services", "mfl.service_mgmt.wrappers"]
        };
        silGridConfig.appConfig = "mflAdminAppConfig";
    }])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .run(["api.oauth2",function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }])

    .run(["$rootScope", "mfl.auth.services.login", "$state", "HOME_PAGE_NAME",
        function ($rootScope, loginService, $state, HOME_PAGE_NAME) {
            $rootScope.$on("$stateChangeStart", function (evt, toState) {
                if (loginService.isLoggedIn()) {
                    if (toState.name === "login") {
                        evt.preventDefault();
                        $state.go(HOME_PAGE_NAME);
                    }
                    return;
                }

                if (_.contains(["login", "logout", ""], toState.name)) {
                    return;
                }

                evt.preventDefault();
                $state.go("login", {"next": toState.name});
            });
        }
    ]);

})(angular, _);
