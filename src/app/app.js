(function (angular) {
    "use strict";

    angular.module("mflApp", [
        "ngAnimate",
        "ui.router",

        "sil.grid",
        "sil.common.logging",

        "templates-app",
        "templates-common",
        "mflAppConfig",
        "mfl.common",

        "mfl.home",
        "mfl.auth",
        "mfl.facilities",
        "mfl.service_mgmt",
        "mfl.users",
        "mfl.setup"
    ]);

})(angular);
