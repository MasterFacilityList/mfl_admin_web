(function () {
    "use strict";
    angular.module("mfl.dashboard", [
        //3rd party stuff
        "ui.router",
        "ui.bootstrap",
        "ui.bootstrap.tpls",
        //our stuff
        "mfl.dashboard.controllers",
        "mfl.dashboard.states"
    ]);
})();
