(function (angular) {
    "use strict";

    angular.module("mfl.notifications.states", [
        "ui.router"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("notifications", {
            url: "^/notifications/",
            views: {
                "main-content@notifications": {
                    templateUrl: "notifications/tpls/grid.tpl.html",
                    controller: "mfl.notifications.controllers.list"
                }
            }
        });
    }]);

})(window.angular);
(function (angular) {
    "use strict";

    angular.module("mfl.notifications.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("notifications", {
            url: "/notifications",
            views: {
                "main": {
                    templateUrl: "common/tpls/main.tpl.html"
                },
                "header@notifications": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@notifications" : {
                    templateUrl : "notifications/tpls/body.tpl.html"
                },
                "main-content@notifications": {
                    templateUrl: "notifications/tpls/grid.tpl.html",
                    controller: "mfl.notifications.controllers.list"
                }
            },
            data : { pageTitle: "Notifications Management" }
        })
        .state("notifications.create", {
            url: "/create",
            parent: "notifications",
            views:{
                "main-content@notifications": {
                    templateUrl: "notifications/tpls/create.tpl.html",
                    controller: "mfl.notifications.controllers.create"
                }
            }
        })
        .state("notifications.edit", {
            url: "/edit/:notification_id/",
            parent: "notifications",
            views:{
                "main-content@notifications": {
                    templateUrl: "notifications/tpls/create.tpl.html",
                    controller: "mfl.notifications.controllers.create"
                }
            }
        })
        .state("notifications.view", {
            url: "/view/:notification_id/",
            parent: "notifications",
            views:{
                "main-content@notifications": {
                    templateUrl: "notifications/tpls/view.tpl.html",
                    controller: "mfl.notifications.controllers.view"
                }
            }
        })
        .state("notifications.delete", {
            url: "/delete/:notification_id/",
            parent: "notifications",
            views:{
                "main-content@notifications": {
                    templateUrl: "notifications/tpls/delete.tpl.html",
                    controller: "mfl.notifications.controllers.delete"
                }
            }
        });
    }]);

})(window.angular);
