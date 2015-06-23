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
                    templateUrl: "common/tpls/main.tpl.html"
                },
                "header@service_mgmt": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@service_mgmt": {
                    controller:"mfl.common.controllers.stateServices"
                }
            },
            data : { pageTitle: "Service Management" },
            permission: "facilities.view_service",
            redirectTo: "service_mgmt.category_list"
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
            },
            cache: false,
            permission: "facilities.view_servicecategory"
        })

        .state("service_mgmt.category_list.category_create", {
            url: "create/",
            views: {
                "main-content@service_mgmt.category_list": {
                    controller: "mfl.service_mgmt.controllers.category_create",
                    templateUrl: "service_mgmt/tpls/category_edit.tpl.html"
                }
            },
            permission: "facilities.add_servicecategory"
        })

        .state("service_mgmt.category_list.category_edit", {
            url: ":category_id/edit/",
            views: {
                "main-content@service_mgmt.category_list": {
                    controller: "mfl.service_mgmt.controllers.category_edit",
                    templateUrl: "service_mgmt/tpls/category_edit.tpl.html"
                }
            },
            permission: "facilities.view_servicecategory"
        })
        .state("service_mgmt.category_list.category_edit.delete", {
            url: "delete/",
            views: {
                "delete@service_mgmt.category_list.category_edit": {
                    controller: "mfl.service_mgmt.controllers.category_edit",
                    templateUrl: "common/tpls/delete.tpl.html"
                }
            },
            permission: "facilities.delete_servicecategory"
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
            },
            permission: "facilities.view_service"
        })

        .state("service_mgmt.service_list.service_create", {
            url: "create/",
            views: {
                "main-content@service_mgmt.service_list": {
                    controller: "mfl.service_mgmt.controllers.service_create",
                    templateUrl: "service_mgmt/tpls/service_edit.tpl.html"
                }
            },
            permission: "facilities.add_service"
        })

        .state("service_mgmt.service_list.service_edit", {
            url: ":service_id/edit/",
            views: {
                "main-content@service_mgmt.service_list": {
                    controller: "mfl.service_mgmt.controllers.service_edit",
                    templateUrl: "service_mgmt/tpls/service_edit.tpl.html"
                }
            },
            permission: "facilities.view_service",
            redirectTo: "service_mgmt.service_list.service_edit.basic"
        })

        .state("service_mgmt.service_list.service_edit.basic", {
            url: "basic/",
            views: {
                "form-view@service_mgmt.service_list.service_edit": {
                    controller: "mfl.service_mgmt.controllers.service_edit.basic",
                    templateUrl: "service_mgmt/tpls/service_edit.basic.tpl.html"
                }
            },
            permission: "facilities.view_service"
        })

        .state("service_mgmt.service_list.service_edit.options", {
            url: "options/",
            views: {
                "form-view@service_mgmt.service_list.service_edit": {
                    controller: "mfl.service_mgmt.controllers.service_edit.options",
                    templateUrl: "service_mgmt/tpls/service_edit.options.tpl.html"
                }
            },
            permission: "facilities.view_service"
        })

        .state("service_mgmt.service_list.service_edit.delete", {
            url: "delete/",
            views: {
                "delete@service_mgmt.service_list.service_edit": {
                    controller: "mfl.service_mgmt.controllers.service_edit",
                    templateUrl: "common/tpls/delete.tpl.html"
                }
            },
            permission: "facilities.delete_service"
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
            },
            permission: "facilities.view_option"
        })

        .state("service_mgmt.option_list.option_create", {
            url: "create/",
            views: {
                "main-content@service_mgmt.option_list": {
                    controller: "mfl.service_mgmt.controllers.option_create",
                    templateUrl: "service_mgmt/tpls/option_edit.tpl.html"
                }
            },
            permission: "facilities.add_option"
        })

        .state("service_mgmt.option_list.option_edit", {
            url: ":option_id/edit/",
            views: {
                "main-content@service_mgmt.option_list": {
                    controller: "mfl.service_mgmt.controllers.option_edit",
                    templateUrl: "service_mgmt/tpls/option_edit.tpl.html"
                }
            },
            permission: "facilities.view_option"
        })

        .state("service_mgmt.option_list.option_edit.delete", {
            url: "delete/",
            views: {
                "delete@service_mgmt.option_list.option_edit": {
                    controller: "mfl.service_mgmt.controllers.option_edit",
                    templateUrl: "common/tpls/delete.tpl.html"
                }
            },
            permission: "facilities.delete_option"
        });

    }]);

})(angular);
