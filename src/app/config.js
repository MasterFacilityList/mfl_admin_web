(function (angular) {
    "use strict";

    angular.module("mflAdminAppConfig", [
        "sil.common.logging",
        "sil.api.wrapper",
        "sil.grid",
        "mfl.auth.oauth2"
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
            users : ["mfl.users.wrapper", "usersApi"],
            roles : ["mfl.users.wrapper","rolesApi"],
            permissions : ["mfl.users.wrapper", "permissionsApi"],
            contactsApi : ["mfl.users.wrapper", "contactsApi"],
            contact_type : ["mfl.users.wrapper", "contact_typeApi"],
            user_contacts : ["mfl.users.wrapper", "user_contactsApi"],
            service_mgmt: ["mfl.service_mgmt.services", "mfl.service_mgmt.wrappers"]
        };
        silGridConfig.appConfig = "mflAdminAppConfig";
    }])

    .run(["api.oauth2", function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }]);

})(angular);
