(function (angular) {
    "use strict";

    angular.module("mfl.service_mgmt", [
        "formly",
        "formlyBootstrap",
        "mfl.service_mgmt.states",
        "mfl.service_mgmt.services",
        "mfl.service_mgmt.controllers",
        "mfl.common.filters",
        "mfl.common.services"
    ]);

})(angular);
