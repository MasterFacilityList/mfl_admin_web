(function (angular) {
    "use strict";

    angular.module("mfl.facilities.services", [
        "sil.api.wrapper"
    ])

    .service("mfl.facilities.wrappers", ["api", function (api) {
        this.facilities = api.setBaseUrl("api/facilities/facilities/");
        this.facilitiesList = api.setBaseUrl("api/facilities/facilities_list");
    }]);

})(angular);
