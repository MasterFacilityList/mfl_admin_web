(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.edit", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("facilities.facility_edit", {
                url: "edit/:facility_id/",
                views: {
                    "main-content@facility_mgmt": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit"
                    }
                },
                redirectTo: "facilities.facility_edit.basic",
                permission: "facilities.view_facility"
            })

            .state("facilities.facility_edit.delete", {
                url: "delete/",
                views: {
                    "delete@facilities.facility_edit": {
                        templateUrl: "common/tpls/delete.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit"
                    }
                },
                permission: "facilities.delete_facility"
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
                },
                permission: "facilities.view_facility"
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
                },
                permission: "facilities.view_facility"
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
                },
                permission: "facilities.view_facility"
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
                },
                permission: "facilities.view_facility"
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
                },
                permission: "facilities.view_facility"
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
                },
                permission: "facilities.view_facility"
            })
            .state("facilities.facility_edit.location", {
                url: "location/",
                views: {
                    "tab-header@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.tab-headers.tpl.html"
                    },
                    "form-view@facilities.facility_edit": {
                        templateUrl: "facility_mgmt/tpls/facility_edit.location.tpl.html",
                        controller: "mfl.facility_mgmt.controllers.facility_edit.location"
                    }
                },
                permission: "facilities.view_facility"
            });
    }]);

})(angular);
