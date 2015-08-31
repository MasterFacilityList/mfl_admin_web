(function (angular, jQuery) {
    "use strict";

    angular.module("mflAdminAppConfig", [
        "common.logging",
        "api.wrapper",
        "sil.grid",
        "angular-loading-bar",
        "mfl.auth.oauth2",
        "ui.router",
        "angular-toasty",
        "mfl.auth.services",
        "ngIdle",
        "mfl.common.forms",
        "jcs-autoValidate"
    ])

    .constant("SERVER_URL", angular.copy(window.MFL_SETTINGS.SERVER_URL))
    .constant("CREDZ", angular.copy(window.MFL_SETTINGS.CREDZ))
    .constant("SESSION_TIMEOUT", angular.copy(window.MFL_SETTINGS.TIMEOUT))

    .constant("HOME_PAGE_NAME", "dashboard")

    .config(["loggingConfigProvider", function(loggingConfig){
        loggingConfig.LOG_TO_SERVER = false;
        loggingConfig.LOG_SERVER_URL = undefined;
        loggingConfig.LOG_TO_CONSOLE = true;
    }])

    .config(["silGridConfigProvider", function(silGridConfig) {
        silGridConfig.apiMaps = {
            owners: ["mfl.facilities.wrapper", "ownersApi"],
            users : ["mfl.users.services", "mfl.users.services.wrappers"],
            admin: ["mfl.setup.api", "adminApi"],
            facilities: ["mfl.facility_mgmt.services","mfl.facility_mgmt.services.wrappers"],
            service_mgmt: ["mfl.service_mgmt.services", "mfl.service_mgmt.wrappers"]
        };
    }])

    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .config(["$httpProvider", function($httpProvider) {
        var val = "no-cache, no-store, max-age=0";
        $httpProvider.defaults.headers.common["Cache-Control"] = val;
        jQuery.ajaxSetup({
            headers: {
                "Cache-Control": val
            }
        });
    }])

    .config(["IdleProvider", "SESSION_TIMEOUT", function (ip, st) {
        ip.idle(st.kickout);
        ip.timeout(st.warning);
        ip.keepalive(false);
    }])
    .config(["toastyConfigProvider", function(toastyConfigProvider) {
        toastyConfigProvider.setConfig({
            sound: false,
            position: "top-right",
            theme: "default"
        });
    }])
    .run(["Idle", function (idle) {
        idle.watch();
    }])

    .run(["api.oauth2",function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }])

    .run(["mfl.auth.services.statecheck", function (statecheck) {
        statecheck.startListening();
    }])

    .run(["bootstrap3ElementModifier", function (bootstrap3ElementModifier) {
        bootstrap3ElementModifier.enableValidationStateIcons(false);
    }]);

})(window.angular, window.jQuery);
