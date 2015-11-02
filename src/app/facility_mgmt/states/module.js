(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.facility_mgmt.states
     *
     * @description
     * Combines all the states in facility_mgmt module
     */
    angular.module("mfl.facility_mgmt.states", [
        "mfl.facility_mgmt.states.base",
        "mfl.facility_mgmt.states.edit",
        "mfl.facility_mgmt.states.list",
        "mfl.facility_mgmt.states.create",
        "mfl.facility_mgmt.states.approve",
        "mfl.facility_mgmt.states.publish",
        "mfl.facility_mgmt.states.regulate",
        "mfl.facility_mgmt.states.upgrade_downgrade",
        "mfl.facility_mgmt.states.regulator_sync"
    ]);

})(window.angular);
