(function(angular){
    "use strict";
    angular.module("mfl.setup", [
        "ui.router",
        "angular-toasty",
        "mfl.setup.controllers",
        "mfl.setup.facilities.controllers",
        "mfl.setup.routes",
        "mfl.setup.api",
        "mfl.common.directives"
    ]);
})(window.angular);
