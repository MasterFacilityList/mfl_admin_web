(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.keph
     *
     * @description
     * Contains the states used for keph setup
     */
    angular.module("mfl.setup.routes.keph", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        /**
         * @ngdoc state
         *
         * @name setup.facility_kephs
         *
         * @description
         * The state used to view list of keph
         */
            .state("setup.facility_kephs", {
                url: "/facility_kephs",
                views: {
                    "body@setup" : {
                        templateUrl: "setup/tpls/dashboard/body.tpl.html"
                    },
                    "main-content@setup.facility_kephs": {
                        controller: "mfl.setup.controller.keph.list",
                        templateUrl: "setup/tpls/facilities/keph/keph.tpl.html"
                    }
                },
                permission: "facilities.view_kephlevel",
                userFeature: "is_staff,is_national"
            })

        /**
         * @ngdoc state
         *
         * @name setup.facility_kephs.keph_edit
         *
         * @description
         * The state used to edit a keph level
         */
            .state("setup.facility_kephs.keph_edit", {
                url: "/edit/:keph_id",
                views: {
                    "main-content@setup.facility_kephs": {
                        controller: "mfl.setup.controller.keph.edit",
                        templateUrl: "setup/tpls/facilities/keph/keph.edit.tpl.html"
                    }
                },
                permission: "facilities.change_kephlevel",
                userFeature: "is_staff,is_national"
            })

        /**
         * @ngdoc state
         *
         * @name setup.facility_kephs.keph_edit.delete
         *
         * @description
         * The state used to delete a keph level
         */
            .state("setup.facility_kephs.keph_edit.delete", {
                url: "/delete",
                views: {
                    "delete@setup.facility_kephs.keph_edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.setup.controller.keph.edit"
                    }
                },
                permission: "facilities.delete_kephlevel",
                userFeature: "is_staff,is_national"
            })

        /**
         * @ngdoc state
         *
         * @name setup.facility_kephs.keph_create
         *
         * @description
         * The state used to create a keph level
         */
            .state("setup.facility_kephs.keph_create", {
                url: "/create",
                views: {
                    "main-content@setup.facility_kephs": {
                        controller: "mfl.setup.controller.keph.create",
                        templateUrl: "setup/tpls/facilities/keph/keph.edit.tpl.html"
                    }
                },
                permission: "facilities.add_kephlevel",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
