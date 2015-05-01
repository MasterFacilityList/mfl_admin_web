"use strict";

angular.module("mfl.admin_units", [
    //3rd part stuff
    "ui.router",
    //our stuff
    "mfl.admin_units.controllers",
    "mfl.admin_units.county_controllers",
    "mfl.admin_units.constituency_controllers",
    "mfl.admin_units.ward_controllers",
    "mfl.admin_units.routes",
    "mfl.counties.wrapper",
    "mfl.common.directives"
]);
