(function (angular) {
    "use strict";

    angular.module("mflAdminAppConfig", [
        "common.logging",
        "api.wrapper",
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
            facilities: ["mfl.facility_mgmt.services","mfl.facility_mgmt.services.wrappers"],
            service_mgmt: ["mfl.service_mgmt.services", "mfl.service_mgmt.wrappers"]
        };
    }])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .run(["api.oauth2",function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }])

    .run(["mfl.auth.services.statecheck", function (statecheck) {
        statecheck.startListening();
    }]);

})(angular);
