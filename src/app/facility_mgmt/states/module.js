(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states", [
        "mfl.facility_mgmt.states.base",
        "mfl.facility_mgmt.states.edit",
        "mfl.facility_mgmt.states.list",
        "mfl.facility_mgmt.states.create",
        "mfl.facility_mgmt.states.approve",
        "mfl.facility_mgmt.states.publish",
        "mfl.facility_mgmt.states.regulate",
        "mfl.facility_mgmt.states.upgrade_downgrade"
    ]);

})(window.angular);
