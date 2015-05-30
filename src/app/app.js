(function (angular) {
    "use strict";

    angular.module("mflAdminApp", [
        "templates-app",
        "templates-common",

        "sil.common.logging",
        "sil.api.wrapper",
        "mflAdminAppConfig",
        "mfl.common",
        "mfl.auth",
        "mfl.users",
        "mfl.service_mgmt",
        "mfl.setup",
        "mfl.facilities"
    ]);

})(angular);
