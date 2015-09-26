(function (angular) {
    "use strict";

    angular.module("mfl.chul.services", [
        "api.wrapper"
    ])

    .service("mfl.chul.services.wrappers", ["api", function (api) {
        this.chuls = api.setBaseUrl("api/chul/units/");
        this.workers = api.setBaseUrl("api/chul/workers/");
        this.unit_status = api.setBaseUrl("api/chul/statuses/");
        this.facilities = api.setBaseUrl("api/facilities/facilities/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
        this.unit_contacts = api.setBaseUrl("api/chul/unit_contacts/");
    }]);

})(window.angular);
