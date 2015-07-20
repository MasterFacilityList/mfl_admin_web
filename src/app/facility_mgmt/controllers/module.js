(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers", [
        "mfl.facility_mgmt.controllers.edit",
        "mfl.facility_mgmt.controllers.list",
        "mfl.facility_mgmt.controllers.create",
        "mfl.facility_mgmt.controllers.upgrade_downgrade",
        "mfl.facility_mgmt.controllers.publish",
        "mfl.facility_mgmt.controllers.regulate",
        "mfl.facility_mgmt.controllers.approve"
    ]);

})(window.angular);
