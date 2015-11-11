(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.dashboard
     *
     * @description
     * Contains the state used for the dashbaord
     */
    angular.module("mfl.setup.routes.documents", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        /**
         * @ngdoc state
         *
         * @name setup.documents
         *
         * @description
         * The state used to view list of docuemnts
         */
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

        /**
         * @ngdoc state
         *
         * @name setup.documents.create
         *
         * @description
         * The state used to create documents
         */
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

        /**
         * @ngdoc state
         *
         * @name setup.documents.edit
         *
         * @description
         * The state used to view/edit documents
         */
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

        /**
         * @ngdoc state
         *
         * @name setup.documents.edit.delete
         *
         * @description
         * The state used to delete documents
         */
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
