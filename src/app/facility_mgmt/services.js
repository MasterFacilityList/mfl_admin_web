(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.services", [
        "api.wrapper",
        "mfl.auth.oauth2"
    ])

    .service("mfl.facility.multistep.service", [function () {
        this.facilityObject = function () {
            var result = [
                {
                    name : "basic",
                    prev : [],
                    count: "1"
                },
                {
                    name : "geolocation",
                    prev : ["basic"],
                    count: "2"
                },
                {
                    name : "contacts",
                    prev : ["basic", "geolocation"],
                    count: "3"
                },
                {
                    name : "units",
                    prev : ["basic", "geolocation", "contacts"],
                    count: "4"
                },
                {
                    name : "services",
                    prev : ["basic", "geolocation",  "contacts", "units"],
                    count: "5"
                }
            ];
            return result;
        };
    }])

    .service("mfl.facility_mgmt.services.wrappers", ["api", "api.oauth2", "$window",
        function (api, oauth2, $window) {
            this.facilities = api.setBaseUrl("api/facilities/facilities/");
            this.facility_detail = api.setBaseUrl("api/facilities/facilities/");
            this.facility_types = api.setBaseUrl("api/facilities/facility_types/");
            this.facility_owners = api.setBaseUrl("api/facilities/owners/");
            this.facility_owner_types = api.setBaseUrl("api/facilities/owner_types/");
            this.regulating_bodies = api.setBaseUrl("api/facilities/regulating_bodies/");
            this.facility_regulation_status = api.setBaseUrl(
                "api/facilities/facility_regulation_status/"
            );
            this.regulation_status = api.setBaseUrl("api/facilities/regulation_status/");
            this.wards = api.setBaseUrl("api/common/wards/");
            this.towns = api.setBaseUrl("api/common/towns");
            this.officers = api.setBaseUrl("api/facilities/officers/");
            this.contact_types = api.setBaseUrl("api/common/contact_types/");
            this.contacts = api.setBaseUrl("api/common/contacts/");
            this.physical_addresses = api.setBaseUrl("api/common/address/");
            this.facility_contacts = api.setBaseUrl("api/facilities/contacts/");
            this.categories = api.setBaseUrl("api/facilities/service_categories/");
            this.services = api.setBaseUrl("api/facilities/services/");
            this.service_options = api.setBaseUrl("api/facilities/service_options/");
            this.options = api.setBaseUrl("api/facilities/options/");
            this.change_reasons = api.setBaseUrl("api/facilities/level_change_reasons/");
            this.facility_services = api.setBaseUrl("api/facilities/facility_services/");
            this.facility_updates = api.setBaseUrl("api/facilities/facility_updates/");
            this.operation_status = api.setBaseUrl("api/facilities/facility_status/");
            this.facility_approvals = api.setBaseUrl("api/facilities/facility_approvals/");
            this.facility_officers = api.setBaseUrl("api/facilities/facility_officers/");
            this.facility_officers_incharge = api.setBaseUrl("api/facilities/officers_incharge/");
            this.facility_upgrade = api.setBaseUrl("api/facilities/facility_upgrade/");
            this.facility_units = api.setBaseUrl("api/facilities/facility_units/");
            this.geo_code_methods = api.setBaseUrl("api/gis/geo_code_methods/");
            this.geo_code_sources = api.setBaseUrl("api/gis/geo_code_sources/");
            this.facility_coordinates = api.setBaseUrl("api/gis/facility_coordinates/");
            this.job_titles = api.setBaseUrl("api/facilities/job_titles/");
            this.create_officer = api.setBaseUrl("api/facilities/officer_facade/");
            this.officer_contacts = api.setBaseUrl("api/facilities/officer_contacts/");
            this.keph_levels = api.setBaseUrl("api/facilities/keph/");

            var downloadFile = function (base_url, facility_id) {
                var helpers = api.apiHelpers;
                var wrapper = api.setBaseUrl(base_url);
                var url = wrapper.makeUrl(
                    helpers.joinUrl([wrapper.apiBaseUrl, facility_id])
                );
                var download_params = {
                    "access_token": oauth2.getToken().access_token
                };
                $window.location.href = url + "?" + helpers.makeParams(download_params);
            };
            this.getCorrectionTemplate = function (facility_id) {
                downloadFile("api/facilities/facility_correction_template/", facility_id);
            };

            this.printFacility = function (facility_id) {
                downloadFile("api/facilities/facility_cover_report/", facility_id);
            };
        }
    ]);
})(window.angular);
