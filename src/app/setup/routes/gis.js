(function (angular) {
    "use strict";

    angular.module("mfl.setup.routes.gis", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

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
            }
        })
        .state("setup.geocode_methods_create", {
            url: "/geocode_methods/create",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_methods_create": {
                    templateUrl: "setup/tpls/gis/methods.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_create"
                }
            }
        })
        .state("setup.geocode_methods_edit", {
            url: "/geocode_methods/edit/:geocode_method_id",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_methods_edit": {
                    templateUrl: "setup/tpls/gis/methods.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_edit"
                }
            }
        })
        .state("setup.geocode_methods_delete", {
            url: "/geocode_methods/delete/:geocode_method_id",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_methods_delete": {
                    templateUrl: "setup/tpls/gis/methods.delete.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_methods_delete"
                }
            }
        })

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
            }
        })
        .state("setup.geocode_sources_create", {
            url: "/geocode_sources/create",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_sources_create": {
                    templateUrl: "setup/tpls/gis/sources.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_create"
                }
            }
        })
        .state("setup.geocode_sources_edit", {
            url: "/geocode_sources/edit/:geocode_source_id",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_sources_edit": {
                    templateUrl: "setup/tpls/gis/sources.edit.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_edit"
                }
            }
        })
        .state("setup.geocode_sources_delete", {
            url: "/geocode_sources/delete/:geocode_source_id",
            views: {
                "body@setup" : {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.geocode_sources_delete": {
                    templateUrl: "setup/tpls/gis/sources.delete.tpl.html",
                    controller: "mfl.setup.gis.controllers.geocode_sources_delete"
                }
            }
        });
    }]);

})(angular);
