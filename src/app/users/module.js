(function (angular) {

    "use strict";

    angular.module("mfl.users", [
        "ui.router",
        "ui.bootstrap",
        "ui.bootstrap.tpls",

        "mfl.users.controllers",
        "mfl.users.states",
        "mfl.users.services",
        "mfl.common.directives"
    ]);

})(angular);
