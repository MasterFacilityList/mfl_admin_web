(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.towns
     *
     * @description
     * Contains the states used for towns
     */
    angular.module("mfl.setup.routes.towns", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

            /**
             * @ngdoc state
             *
             * @name setup.towns
             *
             * @description
             * The state used to view list of towns
             */
            .state("setup.towns", {
                url: "/towns",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.list",
                        templateUrl: "setup/tpls/towns/towns.tpl.html"
                    }
                },
                permission: "common.view_town",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.towns.town_edit
             *
             * @description
             * The state used to view/edit a town
             */
            .state("setup.towns.town_edit", {
                url: "/edit/:town_id",
                views: {
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.edit",
                        templateUrl: "setup/tpls/towns/towns.edit.tpl.html"
                    }
                },
                permission: "common.view_town",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.towns.town_edit.delete
             *
             * @description
             * The state used to delete a town
             */
            .state("setup.towns.town_edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.towns.town_edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.setup.controller.town.edit"
                    }
                },
                permission: "common.delete_town",
                userFeature: "is_staff,is_national"
            })

            /**
             * @ngdoc state
             *
             * @name setup.towns.town_create
             *
             * @description
             * The state used to create a town
             */
            .state("setup.towns.town_create", {
                url: "/create",
                views: {
                    "main-content@setup.towns": {
                        controller: "mfl.setup.controller.town.create",
                        templateUrl: "setup/tpls/towns/towns.edit.tpl.html"
                    }
                },
                permission: "common.add_town",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
