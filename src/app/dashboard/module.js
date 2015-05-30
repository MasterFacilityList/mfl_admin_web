(function () {
    "use strict";
    angular.module("mfl.dashboard", [
        "ui.router",
        "ui.bootstrap",
        "ui.bootstrap.tpls",

        "mfl.dashboard.controllers",
        "mfl.dashboard.states",
        "mfl.dashboard.wrapper"
    ]);
})();
