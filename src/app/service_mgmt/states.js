(function (angular) {

    "use strict";

    angular.module("mfl.service_mgmt.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("service_mgmt", {
            url: "/services/",
            views: {
                "main": {
                    controller: "mfl.service_mgmt.controllers.main",
                    templateUrl: "service_mgmt/tpls/main.tpl.html"
                },
                "header@service_mgmt": {
                    controller: "mfl.users.controllers.home",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "sidebar@service_mgmt": {
                    templateUrl: "service_mgmt/tpls/side_nav.tpl.html"
                },
                "main-content@service_mgmt": {
                    controller: "mfl.service_mgmt.controllers.service_list",
                    templateUrl: "service_mgmt/tpls/service_grid.tpl.html"
                }
            },
            data : { pageTitle: "Service Management" }
        })

        // ============== services ====================

        .state("service_mgmt.service_list", {
            url: "services/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.service_list",
                    templateUrl: "service_mgmt/tpls/service_grid.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_create", {
            url: "services/create/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.service_create",
                    templateUrl: "service_mgmt/tpls/service_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_edit", {
            url: "services/:service_id/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.service_edit",
                    templateUrl: "service_mgmt/tpls/service_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_delete", {
            url: "services/:service_id/delete/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.service_delete",
                    templateUrl: "service_mgmt/tpls/service_delete.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_edit.options", {
            url: "options/",
            views: {
                "options": {
                    controller: "mfl.service_mgmt.controllers.service_options",
                    templateUrl: "service_mgmt/tpls/service_options.tpl.html"
                }
            }
        })

        // ============== categories ====================
        .state("service_mgmt.category_list", {
            url: "categories/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.category_list",
                    templateUrl: "service_mgmt/tpls/category_grid.tpl.html"
                }
            }
        })

        .state("service_mgmt.category_create", {
            url: "categories/create/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.category_create",
                    templateUrl: "service_mgmt/tpls/category_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.category_edit", {
            url: "categories/:category_id/edit/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.category_edit",
                    templateUrl: "service_mgmt/tpls/category_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.category_delete", {
            url: "categories/:category_id/delete/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.category_delete",
                    templateUrl: "service_mgmt/tpls/category_delete.tpl.html"
                }
            }
        })

        // ============== options ====================

        .state("service_mgmt.option_list", {
            url: "options/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.option_list",
                    templateUrl: "service_mgmt/tpls/option_grid.tpl.html"
                }
            }
        })

        .state("service_mgmt.option_create", {
            url: "options/create/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.option_create",
                    templateUrl: "service_mgmt/tpls/option_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.option_edit", {
            url: "options/:option_id/edit/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.option_edit",
                    templateUrl: "service_mgmt/tpls/option_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.option_delete", {
            url: "options/:option_id/delete/",
            views: {
                "main-content": {
                    controller: "mfl.service_mgmt.controllers.option_delete",
                    templateUrl: "service_mgmt/tpls/option_delete.tpl.html"
                }
            }
        });

    }]);

})(angular);
