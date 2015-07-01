(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.edit", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("facilities.facility_edit", {
                url: ":facility_id/",
                views: {
                    "main-content@facility_mgmt": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit"
                    }
                },
                redirectTo: "facilities.facility_edit.basic"
            })

            .state("facilities.facility_edit.basic", {
                url: "basic/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.basic.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.basic"
                    }
                }
            })

            .state("facilities.facility_edit.contacts", {
                url: "contacts/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.contacts.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.contacts"
                    }
                }
            })
            .state("facilities.facility_edit.services", {
                url: "services/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.services.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.services"
                    }
                }
            })
            .state("facilities.facility_edit.units", {
                url: "units/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.units.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.units"
                    }
                }
            })
            .state("facilities.facility_edit.officers", {
                url: "officers/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.officers.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.officers"
                    }
                }
            })
            .state("facilities.facility_edit.setup", {
                url: "setup/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.setup.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.setup"
                    }
                }
            })
            ;
    }]);

})(angular);
