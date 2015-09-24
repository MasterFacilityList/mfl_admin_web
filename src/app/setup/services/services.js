(function(angular){
    "use strict";

    angular.module("mfl.setup.api", [
        "api.wrapper",
        "mfl.auth.oauth2",
        "ngFileUpload"
    ])

    .service("adminApi", ["api", "Upload", "api.oauth2",
        function(api, Upload, oauth2) {

            var uploadFile = function (url, file_obj, api_field_name, extra_fields, is_update) {
                var token = oauth2.getToken();
                var upload_config = {
                    "url": url,
                    "fields": extra_fields || {},
                    "file": {},
                    "headers": {
                        "Authorization": token.token_type + " " + token.access_token
                    },
                    "sendFieldAs": "form",
                    "withCredentials": false,
                    "method":  is_update ? "PATCH" : "POST"
                };
                upload_config.file[api_field_name + "," + file_obj.name] = file_obj;
                return Upload.upload(upload_config);
            };

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
                chuService: api.setBaseUrl("api/chul/services/"),
                chuApprovers: api.setBaseUrl("api/chul/approvers/"),
                geocode_methods: api.setBaseUrl("api/gis/geo_code_methods/"),
                geocode_sources: api.setBaseUrl("api/gis/geo_code_sources/"),
                county_users : api.setBaseUrl("api/common/user_counties/"),
                county_slim : api.setBaseUrl("api/counties/slim_detail/"),
                facility_rating_comments: api.setBaseUrl(
                    "api/facilities/facility_service_ratings/"
                ),
                chu_rating_comments: api.setBaseUrl("api/chu/chu_ratings/"),
                facility_depts: api.setBaseUrl("api/facilities/facility_depts/"),
                documents: api.setBaseUrl("api/common/documents/"),
                uploadFile: uploadFile
            };
        }
    ]);

})(window.angular);
