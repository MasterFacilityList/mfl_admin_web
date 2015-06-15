(function(angular){
        "use strict";
        angular.module("mfl.setup", [
            "ui.router",
            "ui.bootstrap",
            "ui.bootstrap.tpls",

            "mfl.setup.controllers",
            "mfl.setup.facilities.controllers",
            "mfl.setup.routes",
            "mfl.setup.api",
            "mfl.common.directives"
        ]);
    })(angular);

