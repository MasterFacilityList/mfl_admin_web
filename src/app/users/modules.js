"use strict";

angular.module("mfl.users", [
    //3rd party stuff
    "ui.router",
    "ui.bootstrap",
    "ui.bootstrap.tpls",
    //out stuff
    "mfl.users.controllers",
    "mfl.users.routes",
    "mfl.auth.directives",
    "mfl.users.wrapper",
    "mfl.common.directives"
]);
