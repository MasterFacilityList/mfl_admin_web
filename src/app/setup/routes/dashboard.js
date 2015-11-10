(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes.dashboard
     *
     * @description
     * Contains the state used for the dashbaord
     */
    angular.module("mfl.setup.routes.dashboard", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            /**
             * @ngdoc state
             *
             * @name setup
             *
             * @description
             * The state used to view sidebar and content area
             */
            .state("setup", {
                url: "/setup",
                views: {
                    "main": {
                        controller: "mfl.setup.controller.dashboard",
                        templateUrl: "common/tpls/main.tpl.html"
                    },
                    "header@setup": {
                        controller: "mfl.common.controllers.header",
                        templateUrl: "common/tpls/header.tpl.html"
                    }
                },
                data : { pageTitle: "System Setup"},
                redirectTo: "setup.counties",
                userFeature: "is_staff,is_national"
            });
    }]);
})(window.angular);
