(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.facilities
     *
     * @description
     * Contains the states used for facility setup
     */
    angular.module("mfl.setup.routes.gis", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        /**
         * @ngdoc state
         *
         * @name setup.geocode_methods_list
         *
         * @description
         * The state used to view list of geocode methods
         */
        .state("setup.geocode_methods_list", {
            url: "/geocode_methods",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_methods_list": {
                    templateUrl: "setup/tpls/gis/methods.grid.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_list"
                }
            },
            permission: "mfl_gis.view_geocodemethod",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_methods_list.geocode_methods_create
         *
         * @description
         * The state used to create a geocode method
         */
        .state("setup.geocode_methods_list.geocode_methods_create", {
            url: "/create",
            views: {
                "main-content@setup.geocode_methods_list": {
                    templateUrl: "setup/tpls/gis/methods.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_create"
                }
            },
            permission: "mfl_gis.view_geocodemethod",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_methods_list.geocode_methods_edit
         *
         * @description
         * The state used to edit a geocode method
         */
        .state("setup.geocode_methods_list.geocode_methods_edit", {
            url: "/edit/:geocode_method_id",
            views: {
                "main-content@setup.geocode_methods_list": {
                    templateUrl: "setup/tpls/gis/methods.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_edit"
                }
            },
            permission: "mfl_gis.view_geocodemethod",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_methods_list.geocode_methods_edit.geocode_methods_delete
         *
         * @description
         * The state used to delete a geocode method
         */
        .state("setup.geocode_methods_list.geocode_methods_edit.geocode_methods_delete", {
            url: "/delete/",
            views: {
                "delete@setup.geocode_methods_list.geocode_methods_edit": {
                    templateUrl: "common/tpls/delete.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_delete"
                }
            },
            permission: "mfl_gis.delete_geocodemethod",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_sources_list
         *
         * @description
         * The state used to view list of geocode sources
         */
        .state("setup.geocode_sources_list", {
            url: "/geocode_sources",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_sources_list": {
                    templateUrl: "setup/tpls/gis/sources.grid.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_list"
                }
            },
            permission: "mfl_gis.view_geocodesource",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_sources_list.geocode_sources_create
         *
         * @description
         * The state used to create a geocode source
         */
        .state("setup.geocode_sources_list.geocode_sources_create", {
            url: "/create",
            views: {
                "main-content@setup.geocode_sources_list": {
                    templateUrl: "setup/tpls/gis/sources.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_create"
                }
            },
            permission: "mfl_gis.add_geocodesource",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_sources_list.geocode_sources_edit
         *
         * @description
         * The state used to edit a geocode source
         */
        .state("setup.geocode_sources_list.geocode_sources_edit", {
            url: "/edit/:geocode_source_id",
            views: {
                "main-content@setup.geocode_sources_list": {
                    templateUrl: "setup/tpls/gis/sources.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_edit"
                }
            },
            permission: "mfl_gis.view_geocodesource",
            userFeature: "is_staff,is_national"
        })

        /**
         * @ngdoc state
         *
         * @name setup.geocode_sources_list.geocode_sources_edit.geocode_sources_delete
         *
         * @description
         * The state used to delete a geocode source
         */
        .state("setup.geocode_sources_list.geocode_sources_edit.geocode_sources_delete", {
            url: "/delete/",
            views: {
                "delete@setup.geocode_sources_list.geocode_sources_edit": {
                    templateUrl: "common/tpls/delete.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_delete"
                }
            },
            permission: "mfl_gis.delete_geocodesource",
            userFeature: "is_staff,is_national"
        });
    }]);

})(window.angular);
