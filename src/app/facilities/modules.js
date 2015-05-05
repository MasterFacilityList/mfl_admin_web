"use strict";
angular.module("mfl.facilities", [
    //3rd party stuff
    "ui.router",
    "ui.bootstrap",
    "ui.bootstrap.tpls",
    //out stuff
    "mfl.facilities.controllers",
    "mfl.facilities.routes",
    "mfl.common.directives",
    "mfl.auth.directives",
    "mfl.officers.wrapper",
    "mfl.facilities.wrapper"
]);
