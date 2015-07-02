(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.services", ["api.wrapper"])

    .service("mfl.facility_mgmt.services.wrappers", ["api", function (api) {
        this.facilities = api.setBaseUrl("api/facilities/facilities_list/");
        this.facility_detail = api.setBaseUrl("api/facilities/facilities/");
        this.facility_types = api.setBaseUrl("api/facilities/facility_types/");
        this.facility_owners = api.setBaseUrl("api/facilities/owners/");
        this.regulating_bodies = api.setBaseUrl("api/facilities/regulating_bodies/");
        this.wards = api.setBaseUrl("api/common/wards/");
        this.towns = api.setBaseUrl("api/common/towns");
        this.officers = api.setBaseUrl("api/facilities/officers/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
        this.physical_addresses = api.setBaseUrl("api/common/address/");
        this.facility_contacts = api.setBaseUrl("api/facilities/contacts/");
        this.services = api.setBaseUrl("api/facilities/services/");
        this.service_options = api.setBaseUrl("api/facilities/service_options/");
        this.facility_services = api.setBaseUrl("api/facilities/facility_services/");
        this.facility_updates = api.setBaseUrl("api/facilities/facility_updates/");
        this.operation_status = api.setBaseUrl("api/facilities/facility_status/");
        this.facility_approvals = api.setBaseUrl("api/facilities/facility_approvals/");
        this.facility_officers = api.setBaseUrl("api/facilities/facility_officers/");
        this.facility_upgrade = api.setBaseUrl("api/facilities/facility_upgrade/");
        this.facility_units = api.setBaseUrl("api/facilities/facility_units/");
        this.geo_code_methods = api.setBaseUrl("api/gis/geo_code_methods/");
        this.geo_code_sources = api.setBaseUrl("api/gis/geo_code_sources/");
        this.facility_coordinates = api.setBaseUrl("api/gis/facility_coordinates/");
    }]);
})(angular);
