(function(angular){
    "use strict";

    angular.module("mfl.setup.api", [
        "api.wrapper"
    ])

    .service("adminApi",["api", function(api) {
        return {
            constituencies: api.setBaseUrl("api/common/constituencies/"),
            wards: api.setBaseUrl("api/common/wards/"),
            counties: api.setBaseUrl("api/common/counties/"),
            sub_counties: api.setBaseUrl("api/common/sub_counties/"),
            kephs: api.setBaseUrl("api/facilities/keph/"),
            towns: api.setBaseUrl("api/common/towns/"),
            contacts: api.setBaseUrl("api/common/contacts/"),
            contact_types: api.setBaseUrl("api/common/contact_types/"),
            facilityJobTitles: api.setBaseUrl("api/facilities/job_titles/"),
            facilityOwnerTypes: api.setBaseUrl("api/facilities/owner_types/"),
            facilityOwners: api.setBaseUrl("api/facilities/owners/"),
            regulatoryBodyContacts: api.setBaseUrl("api/common/contacts/"),
            facilityRegulatoryBodies: api.setBaseUrl("api/facilities/regulating_bodies/"),
            change_reasons: api.setBaseUrl("api/facilities/level_change_reasons/"),
            RegulatoryBodyContacts: api.setBaseUrl("api/facilities/regulating_body_contacts/"),
            chuStatus: api.setBaseUrl("api/chul/statuses/"),
            chuApprovers: api.setBaseUrl("api/chul/approvers/"),
            geocode_methods: api.setBaseUrl("api/gis/geo_code_methods/"),
            geocode_sources: api.setBaseUrl("api/gis/geo_code_sources/"),
            county_users : api.setBaseUrl("api/common/user_counties/"),
            county_slim : api.setBaseUrl("api/counties/slim_detail/"),
            rating_comments: api.setBaseUrl("api/facilities/facility_service_ratings/")
        };
    }]);

})(window.angular);
