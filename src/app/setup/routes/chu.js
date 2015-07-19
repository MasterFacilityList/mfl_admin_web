(function(angular){
    "use strict";
    angular.module("mfl.setup.routes.chu", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.chu_status", {
                url: "/chu_status",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.chu_status": {
                        controller: "mfl.setup.controller.chuStatus.list",
                        templateUrl: "setup/tpls/chu/status/status-list.tpl.html"
                    }
                },
                permission: "chul.view_status",
                userFeature: "is_national"
            })
        .state("setup.chu_status.view", {
                url: "/:id",
                views: {
                    "main-content@setup.chu_status": {
                        controller: "mfl.setup.controller.chuStatus.view",
                        templateUrl: "setup/tpls/chu/status/status-view.tpl.html"
                    }
                },
                permission: "chul.view_status",
                userFeature: "is_national"
            })
        .state("setup.chu_status.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.chu_status.view": {
                        controller: "mfl.setup.controller.chuStatus.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "chul.delete_status",
                userFeature: "is_staff,is_national"
            })
        .state("setup.chu_status.create", {
                url: "/create",
                views: {
                    "main-content@setup.chu_status": {
                        controller: "mfl.setup.controller.chuStatus.view",
                        templateUrl: "setup/tpls/chu/status/status-view.tpl.html"
                    }
                },
                permission: "chul.create_status",
                userFeature: "is_staff,is_national"
            })
        .state("setup.chu_approvers", {
                url: "/chu_approvers",
                views: {
                    "body@setup" : {
                        templateUrl :"setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.chu_approvers": {
                        controller: "mfl.setup.controller.chuApprover.list",
                        templateUrl: "setup/tpls/chu/approvers/approvers-list.tpl.html"
                    }
                },
                permission: "chul.view_approver",
                userFeature: "is_national"
            })
        .state("setup.chu_approvers.view", {
                url: "/:id",
                views: {
                    "main-content@setup.chu_approvers": {
                        controller: "mfl.setup.controller.chuApprover.view",
                        templateUrl: "setup/tpls/chu/approvers/approvers-view.tpl.html"
                    }
                },
                permission: "chul.view_approver",
                userFeature: "is_national"
            })
        .state("setup.chu_approvers.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.chu_approvers.view": {
                        controller: "mfl.setup.controller.chuApprover.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "chul.delete_approver",
                userFeature: "is_staff,is_national"
            })
        .state("setup.chu_approvers.create", {
                url: "/create",
                views: {
                    "main-content@setup.chu_approvers": {
                        controller: "mfl.setup.controller.chuApprover.view",
                        templateUrl: "setup/tpls/chu/approvers/approvers-view.tpl.html"
                    }
                },
                permission: "chul.add_approver",
                userFeature: "is_staff,is_national"
            })
        ;
    }]);
})(window.angular);
