(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.services", ["api.wrapper"])

    .service("mfl.facility_mgmt.services.wrappers", ["api", function (api) {
        this.facilities = api.setBaseUrl("api/facilities/facilities_list/");
        this.facility_detail = api.setBaseUrl("api/facilities/facilities/");
        this.facility_types = api.setBaseUrl("api/facilities/facility_types/");
        this.facility_owners = api.setBaseUrl("api/facilities/owners/");
        this.wards = api.setBaseUrl("api/common/wards/");
        this.towns = api.setBaseUrl("api/common/towns");
        this.officers = api.setBaseUrl("api/facilities/officers/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
        this.physical_addresses = api.setBaseUrl("api/common/address/");
        this.facility_contacts = api.setBaseUrl("api/facilities/contacts/");
        this.service_options = api.setBaseUrl("api/facilities/service_options/");
        this.facility_service = api.setBaseUrl("api/facilities/facility_services/");
    }]);

})(angular);
