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
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@service_mgmt": {
                    controller:"mfl.common.controllers.stateServices"
                }
            },
            data : { pageTitle: "Service Management" }
        })

        // ============== categories ====================

        .state("service_mgmt.category_list", {
            url: "categories/",
            views: {
                "body@service_mgmt": {
                    templateUrl: "service_mgmt/tpls/body.tpl.html"
                },
                "main-content@service_mgmt.category_list": {
                    controller: "mfl.service_mgmt.controllers.category_list",
                    templateUrl: "service_mgmt/tpls/category_grid.tpl.html"
                }
            }
        })

        .state("service_mgmt.category_list.category_create", {
            url: "create/",
            views: {
                "main-content@service_mgmt.category_list": {
                    controller: "mfl.service_mgmt.controllers.category_create",
                    templateUrl: "service_mgmt/tpls/category_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.category_list.category_edit", {
            url: ":category_id/edit/",
            views: {
                "main-content@service_mgmt": {
                    controller: "mfl.service_mgmt.controllers.category_edit",
                    templateUrl: "service_mgmt/tpls/category_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.category_list.category_delete", {
            url: "categories/:category_id/delete/",
            views: {
                "main-content@service_mgmt": {
                    controller: "mfl.service_mgmt.controllers.category_delete",
                    templateUrl: "service_mgmt/tpls/category_delete.tpl.html"
                }
            }
        })

        // ============== services ====================

        .state("service_mgmt.service_list", {
            url: "services/",
            views: {
                "body@service_mgmt": {
                    templateUrl: "service_mgmt/tpls/body.tpl.html"
                },
                "main-content@service_mgmt.service_list": {
                    controller: "mfl.service_mgmt.controllers.service_list",
                    templateUrl: "service_mgmt/tpls/service_grid.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_list.service_create", {
            url: "create/",
            views: {
                "main-content@service_mgmt.service_list": {
                    controller: "mfl.service_mgmt.controllers.service_create",
                    templateUrl: "service_mgmt/tpls/service_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_list.service_edit", {
            url: ":service_id/edit/",
            views: {
                "main-content@service_mgmt.service_list": {
                    controller: "mfl.service_mgmt.controllers.service_edit",
                    templateUrl: "service_mgmt/tpls/service_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_list.service_delete", {
            url: ":service_id/delete/",
            views: {
                "main-content@service_mgmt.service_list": {
                    controller: "mfl.service_mgmt.controllers.service_delete",
                    templateUrl: "service_mgmt/tpls/service_delete.tpl.html"
                }
            }
        })

        .state("service_mgmt.service_list.service_edit.options", {
            url: "options/",
            views: {
                "options": {
                    controller: "mfl.service_mgmt.controllers.service_options",
                    templateUrl: "service_mgmt/tpls/service_options.tpl.html"
                }
            }
        })

        // ============== options ====================

        .state("service_mgmt.option_list", {
            url: "options/",
            views: {
                "body@service_mgmt": {
                    templateUrl: "service_mgmt/tpls/body.tpl.html"
                },
                "main-content@service_mgmt.option_list": {
                    controller: "mfl.service_mgmt.controllers.option_list",
                    templateUrl: "service_mgmt/tpls/option_grid.tpl.html"
                }
            }
        })

        .state("service_mgmt.option_list.option_create", {
            url: "create/",
            views: {
                "main-content@service_mgmt.option_list": {
                    controller: "mfl.service_mgmt.controllers.option_create",
                    templateUrl: "service_mgmt/tpls/option_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.option_list.option_edit", {
            url: ":option_id/edit/",
            views: {
                "main-content@service_mgmt.option_list": {
                    controller: "mfl.service_mgmt.controllers.option_edit",
                    templateUrl: "service_mgmt/tpls/option_edit.tpl.html"
                }
            }
        })

        .state("service_mgmt.option_list.option_delete", {
            url: ":option_id/delete/",
            views: {
                "main-content@service_mgmt.option_list": {
                    controller: "mfl.service_mgmt.controllers.option_delete",
                    templateUrl: "service_mgmt/tpls/option_delete.tpl.html"
                }
            }
        });

    }]);

})(angular);
