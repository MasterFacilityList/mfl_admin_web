(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.upgrade_downgrade", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("facilities.facility_edit.upgrade", {
            url: "upgrade/",
            views: {
                "tab-header@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_upgrade.tabheaders.tpl.html"
                },
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_upgrade_downgrade.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_upgrade"
                }
            }
        })
        .state("facilities.facility_edit.downgrade", {
            url: "downgrade/",
            views: {
                "tab-header@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_downgrade.tabheaders.tpl.html"
                },
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_upgrade_downgrade.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_downgrade"
                }
            }
        })
        .state("facilities.facility_edit.update_services_up", {
            url: "upgrade/update_services/",
            views: {
                "tab-header@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_upgrade.tabheaders.tpl.html"
                },
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_edit.services.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.update_services"
                }
            }
        })
        .state("facilities.facility_edit.update_services_down", {
            url: "downgrade/update_services/",
            views: {
                "tab-header@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_downgrade.tabheaders.tpl.html"
                },
                "form-view@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_edit.services.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.update_services"
                }
            }
        });
    }]);

})(angular);
