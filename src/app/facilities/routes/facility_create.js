(function (angular) {
    "use strict";
    angular.module("mfl.facilities.create", [
        "ui.router",
        "mfl.facilities.base"
    ])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.create", {
            url: "/create",
            views: {
                "main-content@facilities": {
                    templateUrl: "facilities/tpls/create/base.tpl.html"
                }
            },
            data : { pageTitle: "Facility Management" },
            permission: "facilities.add_facility"
        })
        .state("facilities.create.basic", {
                url: "/basicdetails/:facilityId",
                views: {
                    "main-content@facilities" : {
                        templateUrl : "facilities/tpls/create/basic.tpl.html",
                        controller: "mfl.facilities.controllers.create.base"
                    }
                },
                permission: "facilities.add_facility"
            })
        .state("facilities.create.address", {
                url: "/address/:facilityId",
                views: {
                    "main-content@facilities" : {
                        templateUrl : "facilities/tpls/create/address.tpl.html",
                        controller: "mfl.facilities.controllers.create.address"
                    }
                },
                permission: "facilities.add_physicaladdress"
            })
        .state("facilities.create.contacts", {
                url: "/contacts/:facilityId",
                views: {
                    "main-content@facilities" : {
                        templateUrl : "facilities/tpls/create/contacts.tpl.html",
                        controller: "mfl.facilities.controllers.create.contacts"
                    }

                },
                permission: "facilities.add_facilitycontact"
            })
        .state("facilities.create.services", {
                url: "/services/:facilityId",
                views: {
                    "main-content@facilities" : {
                        templateUrl : "facilities/tpls/create/services.tpl.html",
                        controller: "mfl.facilities.controllers.create.services"
                    }
                },
                permission: "facilities.add_facilityservice"
            });
    }]);
})(angular);
