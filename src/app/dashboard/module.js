(function (angular) {

    "use strict";

    angular.module("mfl.dashboard", [
        "ui.router",

        "mfl.dashboard.controllers",
        "mfl.dashboard.states",
        "mfl.dashboard.wrapper"
    ]);

})(window.angular);
