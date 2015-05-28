(function (angular) {
    "use strict";

    angular.module("mflAdminAppConfig", [])

    .constant("SERVER_URL", window.MFL_SETTINGS.SERVER_URL)

    .constant("CREDZ", window.MFL_SETTINGS.CREDZ);

})(angular);
