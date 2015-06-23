(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.services", ["api.wrapper"])

    .service("mfl.facility_mgmt.services.wrappers", ["api", function (api) {
        this.facilities = api.setBaseUrl("api/facilities/facilities_list/");
    }]);

})(angular);
