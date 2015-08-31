(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt", [
        "mfl.facility_mgmt.controllers",
        "mfl.facility_mgmt.services",
        "mfl.facility_mgmt.states",
        "ui.select",
        "ngSanitize",
        "angular-toasty",
        "mfl.common.constants"
    ]);

})(window.angular);
