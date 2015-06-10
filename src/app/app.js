(function (angular) {
    "use strict";

    angular.module("mflAdminApp", [
        "templates-app",
        "templates-common",
        "acute.select",

        "sil.common.logging",
        "sil.api.wrapper",
        "mflAdminAppConfig",
        "mfl.common",
        "mfl.auth",
        "mfl.users",
        "mfl.service_mgmt",
        "mfl.setup",
        "mfl.dashboard",
        "mfl.facilities"
    ]);

})(angular);
