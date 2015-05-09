"use strict";
(function(angular){
    angular.module("mfl.setup.routes.chu", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.chu_status", {
                url: "/chu_status",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.chuStatus.list",
                        templateUrl: "setup/tpls/chu/status/status-list.tpl.html"
                    }
                }
            })
        .state("setup.chu_approvers", {
                url: "/chu_approvers",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.chuApprover.list",
                        templateUrl: "setup/tpls/chu/approvers/approvers-list.tpl.html"
                    }
                }
            });
    }]);
})(angular);

