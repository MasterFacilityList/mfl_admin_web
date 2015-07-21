(function (angular) {

    "use strict";

    angular.module("mfl.setup.routes.service_mgmt", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        // ============== categories ====================

        .state("setup.srv_category_list", {
            url: "/categories/",
            views: {
                "body@setup": {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.srv_category_list": {
                    controller: "mfl.setup.controllers.category_list",
                    templateUrl: "setup/tpls/service_mgmt/category_grid.tpl.html"
                }
            },
            permission: "facilities.view_servicecategory",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_category_list.category_create", {
            url: "create/",
            views: {
                "main-content@setup.srv_category_list": {
                    controller: "mfl.setup.controllers.category_create",
                    templateUrl: "setup/tpls/service_mgmt/category_edit.tpl.html"
                }
            },
            permission: "facilities.add_servicecategory",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_category_list.category_edit", {
            url: ":category_id/edit/",
            views: {
                "main-content@setup.srv_category_list": {
                    controller: "mfl.setup.controllers.category_edit",
                    templateUrl: "setup/tpls/service_mgmt/category_edit.tpl.html"
                }
            },
            permission: "facilities.view_servicecategory",
            userFeature: "is_staff,is_national"
        })
        .state("setup.srv_category_list.category_edit.delete", {
            url: "delete/",
            views: {
                "delete@setup.srv_category_list.category_edit": {
                    controller: "mfl.setup.controllers.category_edit",
                    templateUrl: "common/tpls/delete.tpl.html"
                }
            },
            permission: "facilities.delete_servicecategory",
            userFeature: "is_staff,is_national"
        })
        // ============== services ====================

        .state("setup.srv_service_list", {
            url: "/services/",
            views: {
                "body@setup": {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.srv_service_list": {
                    controller: "mfl.setup.controllers.service_list",
                    templateUrl: "setup/tpls/service_mgmt/service_grid.tpl.html"
                }
            },
            permission: "facilities.view_service",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_service_list.service_create", {
            url: "create/?furthest",
            views: {
                "main-content@setup.srv_service_list": {
                    controller: "mfl.setup.controllers.service_create",
                    templateUrl: "setup/tpls/service_mgmt/service_create.tpl.html"
                }
            },
            permission: "facilities.add_service",
            userFeature: "is_staff,is_national"
        })

        //nested created state for service details
        .state("setup.srv_service_list.service_create.basic", {
            url: "basic/:service_id",
            views: {
                "form-view@setup.srv_service_list.service_create" : {
                    controller: "mfl.setup.controllers.service_create.basic",
                    templateUrl: "setup/tpls/service_mgmt/service_edit.basic.tpl.html"
                }
            },
            permission: "facilities.add_service",
            userFeature: "is_staff,is_national"
        })
        .state("setup.srv_service_list.service_create.options", {
            url: ":service_id/options/",
            views: {
                "form-view@setup.srv_service_list.service_create" : {
                    controller: "mfl.setup.controllers.service_edit"+
                                ".options",
                    templateUrl: "setup/tpls/service_mgmt/service_edit.options.tpl.html"
                }
            },
            permission: "facilities.add_service",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_service_list.service_edit", {
            url: ":service_id/edit/",
            views: {
                "main-content@setup.srv_service_list": {
                    controller: "mfl.setup.controllers.service_edit",
                    templateUrl: "setup/tpls/service_mgmt/service_edit.tpl.html"
                }
            },
            permission: "facilities.view_service",
            redirectTo: "setup.service_list.service_edit.basic",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_service_list.service_edit.basic", {
            url: "basic/",
            views: {
                "form-view@setup.srv_service_list.service_edit": {
                    controller: "mfl.setup.controllers.service_edit.basic",
                    templateUrl: "setup/tpls/service_mgmt/service_edit.basic.tpl.html"
                }
            },
            permission: "facilities.view_service",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_service_list.service_edit.options", {
            url: "options/",
            views: {
                "form-view@setup.srv_service_list.service_edit": {
                    controller: "mfl.setup.controllers.service_edit.options",
                    templateUrl: "setup/tpls/service_mgmt/service_edit.options.tpl.html"
                }
            },
            permission: "facilities.view_service",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_service_list.service_edit.delete", {
            url: "delete/",
            views: {
                "delete@setup.srv_service_list.service_edit": {
                    controller: "mfl.setup.controllers.service_edit",
                    templateUrl: "common/tpls/delete.tpl.html"
                }
            },
            permission: "facilities.delete_service",
            userFeature: "is_staff,is_national"
        })

        // ============== options ====================

        .state("setup.srv_option_list", {
            url: "/options/",
            views: {
                "body@setup": {
                    templateUrl: "setup/tpls/dashboard/body.tpl.html"
                },
                "main-content@setup.srv_option_list": {
                    controller: "mfl.setup.controllers.option_list",
                    templateUrl: "setup/tpls/service_mgmt/option_grid.tpl.html"
                }
            },
            permission: "facilities.view_option",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_option_list.option_create", {
            url: "create/",
            views: {
                "main-content@setup.srv_option_list": {
                    controller: "mfl.setup.controllers.option_create",
                    templateUrl: "setup/tpls/service_mgmt/option_edit.tpl.html"
                }
            },
            permission: "facilities.add_option",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_option_list.option_edit", {
            url: ":option_id/edit/",
            views: {
                "main-content@setup.srv_option_list": {
                    controller: "mfl.setup.controllers.option_edit",
                    templateUrl: "setup/tpls/service_mgmt/option_edit.tpl.html"
                }
            },
            permission: "facilities.view_option",
            userFeature: "is_staff,is_national"
        })

        .state("setup.srv_option_list.option_edit.delete", {
            url: "delete/",
            views: {
                "delete@setup.srv_option_list.option_edit": {
                    controller: "mfl.setup.controllers.option_edit",
                    templateUrl: "common/tpls/delete.tpl.html"
                }
            },
            permission: "facilities.delete_option",
            userFeature: "is_staff,is_national"
        });

    }]);

})(window.angular);
