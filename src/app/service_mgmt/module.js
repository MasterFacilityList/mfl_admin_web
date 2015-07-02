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
//    .config(["formlyConfigProvider", function (formlyConfigProvider) {
//        // set templates here
//        formlyConfigProvider.setType({
//            name: "category_edit",
//            templateUrl: "service_mgmt/tpls/formly_category_edit.tpl.html"
//        });
//    }]);

})(angular);
