(function (angular) {

    "use strict";

    angular.module("mfl.users", [
        "ui.router",
        "angular-toasty",
        "mfl.users.controllers",
        "mfl.users.states",
        "mfl.users.services",
        "mfl.common.directives"
    ]);

})(window.angular);
