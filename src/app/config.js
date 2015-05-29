(function (angular) {
    "use strict";

    angular.module("mflAdminAppConfig", [
        "sil.common.logging"
    ])

    .constant("SERVER_URL", window.MFL_SETTINGS.SERVER_URL)

    .constant("CREDZ", window.MFL_SETTINGS.CREDZ)

    .config(["loggingConfigProvider", function(loggingConfig){
        loggingConfig.LOG_TO_SERVER = false;
        loggingConfig.LOG_SERVER_URL = undefined;
        loggingConfig.LOG_TO_CONSOLE = true;
    }]);

})(angular);
