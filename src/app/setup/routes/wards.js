(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.wards
     *
     * @description
     * Contains the states used for ward setup
     */
    angular.module("mfl.setup.routes.wards", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

            /**
             * @ngdoc state
             *
             * @name setup.wards
             *
             * @description
             * The state used to view list of wards
             */
            .state("setup.wards", {
                url: "/wards",
                views: {
                    "body@setup" : {
                        templateUrl : "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.wards": {
                        controller: "mfl.setup.controller.ward.list",
                        templateUrl: "setup/tpls/wards/wards.tpl.html"
                    }
                },
                permission: "common.view_ward",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.wards.edit
             *
             * @description
             * The state used to edit a of ward
             */
            .state("setup.wards.edit", {
                url: "/view/:ward_id",
                views: {
                    "main-content@setup.wards": {
                        controller: "mfl.setup.controller.ward.edit",
                        templateUrl: "setup/tpls/wards/edit_ward.tpl.html"
                    }
                },
                permission: "common.view_ward",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.wards.create
             *
             * @description
             * The state used to create a of ward
             */
            .state("setup.wards.create", {
                url: "/new",
                views: {
                    "main-content@setup.wards": {
                        controller: "mfl.setup.controller.ward.edit",
                        templateUrl: "setup/tpls/wards/edit_ward.tpl.html"
                    }
                },
                permission: "common.view_ward",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
