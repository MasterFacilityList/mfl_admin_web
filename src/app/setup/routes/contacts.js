(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.contacts
     *
     * @description
     * Contains all the states used for contacts setup
     */
    angular.module("mfl.setup.routes.contacts", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

    /**
     * @ngdoc state
     *
     * @name setup.contact_types
     *
     * @description
     * The state used to view list of contact types
     */
        .state("setup.contact_types", {
                url: "/contact_types",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.list",
                        templateUrl: "setup/tpls/contacts/contact-types-list.tpl.html"
                    }
                },
                permission: "common.view_contacttype",
                userFeature: "is_staff,is_national"
            })

    /**
     * @ngdoc state
     *
     * @name setup.contact_types.view
     *
     * @description
     * The state used to view contact types
     */
        .state("setup.contact_types.view", {
                url: "/edit/:id",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                },
                permission: "common.view_contacttype",
                userFeature: "is_staff,is_national"
            })

    /**
     * @ngdoc state
     *
     * @name setup.contact_types.view.delete
     *
     * @description
     * The state used to delete contact types
     */
        .state("setup.contact_types.view.delete", {
                url: "/delete",
                views: {
                    "delete@setup.contact_types.view": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "common/tpls/delete.tpl.html"
                    }
                },
                permission: "common.delete_contacttype",
                userFeature: "is_staff,is_national"
            })

    /**
     * @ngdoc state
     *
     * @name setup.contact_types.create
     *
     * @description
     * The state used to create contact types
     */
        .state("setup.contact_types.create", {
                url: "/create",
                views: {
                    "main-content@setup.contact_types": {
                        controller: "mfl.setup.controller.contact_types.view",
                        templateUrl: "setup/tpls/contacts/contact-types-view.tpl.html"
                    }
                },
                permission: "common.add_contacttype",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
