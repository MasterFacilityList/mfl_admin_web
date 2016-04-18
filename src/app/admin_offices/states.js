(function (angular) {
    "use strict";

    angular.module("mfl.admin_offices.states", [
        "ui.router"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("admin_offices", {
            url: "^/admin_offices/",
            views: {
                "main-content@admin_offices": {
                    templateUrl: "admin_offices/tpls/admin_offices.grid.tpl.html",
                    controller: "mfl.admin_offices.controllers.list"
                }
            }
        });
    }]);

})(window.angular);
(function (angular) {
    "use strict";

    angular.module("mfl.admin_offices.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("admin_offices", {
            url: "/admin_offices",
            views: {
                "main": {
                    templateUrl: "common/tpls/main.tpl.html"
                },
                "header@admin_offices": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@admin_offices" : {
                    templateUrl : "admin_offices/tpls/body.tpl.html"
                },
                "main-content@admin_offices": {
                    templateUrl: "admin_offices/tpls/admin_offices.grid.tpl.html",
                    controller: "mfl.admin_offices.controllers.list"
                }
            },
            data : { pageTitle: "Admin Office Management" }
        })
        .state("admin_offices.create", {
            url: "/admin_offices/create",
            parent: "admin_offices",
            views:{
                "main-content@admin_offices": {
                    templateUrl: "admin_offices/tpls/admin_office_create.tpl.html",
                    controller: "mfl.admin_offices.controllers.create"
                }
            }
        })
        .state("admin_offices.edit", {
            url: "/admin_offices/edit/:admin_office_id/",
            parent: "admin_offices",
            views:{
                "main-content@admin_offices": {
                    templateUrl: "admin_offices/tpls/admin_office_create.tpl.html",
                    controller: "mfl.admin_offices.controllers.create"
                }
            }
        });
    }]);

})(window.angular);
