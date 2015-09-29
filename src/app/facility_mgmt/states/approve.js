(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.approve", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("facilities_closed", {
            "parent": "facility_mgmt",
            "url": "^/facilities_closed/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities.closed.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_closed"
                }
            },
            permission: "facilities.view_closed_facilities"
        })

        .state("facilities_closed.view", {
            "parent": "facility_mgmt",
            "url": "^/facilities_closed/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_rejected.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_closed"
                }
            },
            permission: "facilities.view_closed_facilities"
        })

        .state("facility_reject_list.view", {
            "url": "rejections/:facility_id",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_rejected.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_rejected"
                }
            },
            permission: "facilities.view_rejected_facilities,facilities.view_facility"
        })

        .state("facility_reject_list.view.approve", {
            url: "/approve_facility",
            views: {
                "main-content@facility_mgmt" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve_reject.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facility_approve_list.view", {
            "url": "approvals/:facility_id",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_rejected.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_rejected"
                }
            },
            permission: "facilities.view_facilityapproval,facilities.view_facility"
        })

        .state("facility_approve_list.view.reject", {
            "url": "/reject_facility",
            views: {
                "main-content@facility_mgmt" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve_reject.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve", {
            "parent": "facility_mgmt",
            "url": "^/facilities_approve/",
            "views": {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities_pending.grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_approve"
                }
            },
            permission: "facilities.view_facility"
        })

        .state("facilities_approve_update", {
            parent: "facility_mgmt",
            url: "^/facilities_approve_update/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities_grid.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facilities_approve_update"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve.approve", {
            url: "approve_updates/:facility_id/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facility_approve.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve.pending_approval", {
            url: "pending_updates/:facility_id/",
            views: {
                "main-content@facility_mgmt": {
                    templateUrl: "facility_mgmt/tpls/facilities_pending.view.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_approve"
                }
            },
            permission: "facilities.view_facilityapproval"
        })

        .state("facilities_approve.approve.basic", {
            url: "basic/",
            views: {
                "form-view@facilities_approve.approve" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve.basic.tpl.html"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve.approve.services", {
            url: "services/",
            views: {
                "form-view@facilities_approve.approve" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve.services.tpl.html"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        })

        .state("facilities_approve.approve.units", {
            url: "units/",
            views: {
                "form-view@facilities_approve.approve" : {
                    templateUrl: "facility_mgmt/tpls/facility_approve.units.tpl.html"
                }
            },
            permission: "facilities.add_facilityapproval,facilities.view_facility"
        });
    }]);

})(window.angular);
