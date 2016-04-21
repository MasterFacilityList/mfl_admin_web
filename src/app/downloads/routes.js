(function (angular) {
    "use strict";

    angular.module("mfl.downloads.routes", ["ui.router"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("downloads", {
                url: "/downloads",
                views: {
                    "main": {
                        templateUrl: "common/tpls/main.tpl.html"
                    },
                    "header@downloads": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    },
                    "body@downloads" : {
                        templateUrl : "downloads/tpls/body.tpl.html"
                    },
                    "main-content@downloads": {
                        controller: "mfl.downloads.controllers.downloads",
                        templateUrl: "downloads/tpls/main.tpl.html"
                    }
                },
                data : { pageTitle: "Downloads"}

            });
    }]);
})(window.angular);
