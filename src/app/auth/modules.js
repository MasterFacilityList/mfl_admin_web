"use strict";

angular.module("mfl.auth", [
    //3rd party stuff
    "ui.router",
    //our stuff
    "mfl.auth.controllers",
    "mfl.auth.services",
    "mfl.auth.routers",
    "mfl.auth.directives",
    "mflApp.interceptors"
]);
