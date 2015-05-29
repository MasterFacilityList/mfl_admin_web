(function(angular){
    "use strict";
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
        .state("setup.chu_status.view", {
                url: "/chu_status/:id",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.chuStatus.view",
                        templateUrl: "setup/tpls/chu/status/status-view.tpl.html"
                    }
                }
            })
        .state("setup.chu_status.create", {
                url: "/chu_status/create",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.chuStatus.create",
                        templateUrl: "setup/tpls/chu/status/status-view.tpl.html"
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
            })
        .state("setup.chu_approvers.view", {
                url: "/chu_approvers/:id",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.chuApprover.view",
                        templateUrl: "setup/tpls/chu/approvers/approvers-view.tpl.html"
                    }
                }
            })
        .state("setup.chu_approvers.create", {
                url: "/chu_approvers/create",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.chuApprover.create",
                        templateUrl: "setup/tpls/chu/approvers/approvers-view.tpl.html"
                    }
                }
            })
        ;
    }]);
})(angular);

