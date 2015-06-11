(function(angular){
    "use strict";
    angular.module("mfl.setup.api", [
        "sil.api.wrapper"
    ])
    .provider("adminApi",[function(){
        this.$get = ["api",function(api){
            return {
                constituencies:api.setBaseUrl("api/common/constituencies"),
                wards: api.setBaseUrl("api/common/wards"),
                counties: api.setBaseUrl("api/common/counties"),
                towns: api.setBaseUrl("api/common/towns"),
                contacts: api.setBaseUrl("api/common/contacts/"),
                contact_types: api.setBaseUrl("api/common/contact_types"),
                facilityJobTitles: api.setBaseUrl("api/facilities/job_titles"),
                facilityOwnerTypes: api.setBaseUrl("api/facilities/owner_types"),
                facilityOwners: api.setBaseUrl("api/facilities/owners"),
                regulatoryBodyContacts: api.setBaseUrl("api/common/contacts/"),
                facilityRegulatoryBodies: api.setBaseUrl("api/facilities/regulating_bodies"),
                RegulatoryBodyContacts: api.setBaseUrl("api/facilities/regulating_body_contacts"),
                chuStatus: api.setBaseUrl("api/chul/statuses/"),
                chuApprovers: api.setBaseUrl("api/chul/approvers/")

            };
        }];
    }]);
})(angular);
