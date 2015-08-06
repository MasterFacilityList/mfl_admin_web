(function (angular) {
    "use strict";

    angular.module("mflAdminApp", [
        "templates-app",
        "templates-common",
        "common.logging",
        "api.wrapper",
        "mflAdminAppConfig",
        "mfl.common",
        "mfl.auth",
        "mfl.users",
        "mfl.service_mgmt",
        "mfl.setup",
        "mfl.dashboard",
        "mfl.reports",
        "mfl.facility_mgmt",
        "angulartics",
        "angulartics.google.analytics",
        "jcs-autoValidate"
    ]);

})(window.angular);
