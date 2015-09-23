(function (angular) {
    "use strict";

    angular.module("mfl.chul.services", [
        "api.wrapper"
    ])

    .service("mfl.chul.services.wrappers", ["api", function (api) {
        this.chuls = api.setBaseUrl("api/chul/units/");
        this.unit_status = api.setBaseUrl("api/chul/statuses/");
        this.facilities = api.setBaseUrl("api/facilities/facilities/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
    }]);

})(window.angular);
