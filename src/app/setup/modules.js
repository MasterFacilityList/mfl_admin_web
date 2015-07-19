(function(angular){
    "use strict";
    angular.module("mfl.setup", [
        "ui.router",

        "mfl.setup.controllers",
        "mfl.setup.facilities.controllers",
        "mfl.setup.routes",
        "mfl.setup.api",
        "mfl.common.directives"
    ]);
})(window.angular);
