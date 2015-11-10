(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.constituencies
     *
     * @description
     * Contains all the states used for contacts setup
     */
    angular.module("mfl.setup.routes.constituencies", ["mfl.setup.routes.dashboard"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

            /**
             * @ngdoc state
             *
             * @name setup.constituencies
             *
             * @description
             * The state used to view list of constituencies
             */
            .state("setup.constituencies", {
                url: "/constituencies",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.constituencies": {
                        controller: "mfl.setup.controller.constituency.list",
                        templateUrl: "setup/tpls/constituencies/constituencies.tpl.html"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.constituencies.view_const
             *
             * @description
             * The state used to view/edit constituencies
             */
            .state("setup.constituencies.view_const", {
                url: "/details/:const_id",
                views: {
                    "main-content@setup.constituencies": {
                        templateUrl: "setup/tpls/constituencies/constituency.details.tpl.html",
                        controller :"mfl.setup.controller.constituency.details"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.constituencies.create
             *
             * @description
             * The state used to create constituencies
             */
            .state("setup.constituencies.create", {
                url: "/create",
                views: {
                    "main-content@setup.constituencies": {
                        templateUrl: "setup/tpls/constituencies/create_constituency.tpl.html",
                        controller :"mfl.setup.controller.constituency.create"
                    }
                },
                permission: "common.view_constituency",
                userFeature: "is_staff,is_national"
            });
    }]);

})(window.angular);
