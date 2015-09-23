(function (angular) {
    "use strict";

    angular.module("mfl.setup.routes.documents", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("setup.documents", {
            url: "/documents",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.documents": {
                    templateUrl: "setup/tpls/documents/grid.tpl.html",
                    controller: "mfl.setup.controllers.documents.list"
                }
            },
            userFeature: "is_staff,is_national"
        })
        .state("setup.documents.create", {
            url: "/create",
            views: {
                "main-content@setup.documents": {
                    templateUrl: "setup/tpls/documents/edit.tpl.html",
                    controller: "mfl.setup.controllers.documents.edit"
                }
            },
            userFeature: "is_staff,is_national"
        })
        .state("setup.documents.edit", {
            url: "/edit/:document_id",
            views: {
                "main-content@setup.documents": {
                    templateUrl: "setup/tpls/documents/edit.tpl.html",
                    controller: "mfl.setup.controllers.documents.edit"
                }
            },
            userFeature: "is_staff,is_national"
        })
        .state("setup.documents.edit.delete", {
            url: "/delete/",
            views: {
                "delete@setup.documents.edit": {
                    templateUrl: "common/tpls/delete.tpl.html",
                    controller: "mfl.setup.controllers.documents.edit"
                }
            },
            userFeature: "is_staff,is_national"
        });
    }]);

})(window.angular);
