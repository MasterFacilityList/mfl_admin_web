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
        $urlRouterProvider.otherwise(function($injector) {
                var $state = $injector.get("$state");
                $state.go("dashboard");
            });
    }])

    .run(["api.oauth2",function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }])

    .run(["$rootScope", "mfl.auth.services.login", "$state",
        function ($rootScope, loginService, $state) {
            $rootScope.$on("$stateChangeStart", function (evt, toState) {
                if (loginService.isLoggedIn()) {
                    if (toState.name === "login") {
                        evt.preventDefault();
                        $state.go("dashboard");
                    }
                    return;
                }

                if (_.contains(["login", "logout", ""], toState.name)) {
                    return;
                }

                evt.preventDefault();
                $state.go("login", {"next": toState.url});
            });
        }
    ]);

})(angular, _);
