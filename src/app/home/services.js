(function (angular) {
    "use strict";

    angular.module("mfl.home.services", [
        "sil.api.wrapper"
    ])

    .service("mfl.home.services.home", ["api", function (api) {
        var facilities_wrapper = api.setBaseUrl("api/facilities/facilities/");

        this.getLatestFacilities = function () {
            var params = {
                "page_size": 4
            };
            return facilities_wrapper.filter(params);
        };
    }]);

})(angular);
