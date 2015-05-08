"use strict";
(function(angular){
    angular.module("mfl.setup.routes.facilityOwners", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.facility_owners", {
                url: "/facility_owners",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityOwner.list",
                        templateUrl: "setup/tpls/facility_owners/facility-owners-list.tpl.html"
                    }
                }
            })

        .state("setup.facility_owner_types", {
                url: "/facility_owners_types",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.facilityOwnerType.list",
                        templateUrl: "setup/tpls/facility_owners/facility-owner-types-list.tpl.html"
                    }
                }
            })
        ;
    }]);
})(angular);

