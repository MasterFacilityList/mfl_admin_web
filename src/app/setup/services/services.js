"use strict";

(function(angular){
    angular.module("mfl.setup.api", [
        "mfl.setup.constituencies.wrapper",
        "mfl.setup.counties.wrapper",
        "mfl.setup.towns.wrapper",
        "mfl.setup.wards.wrapper",
        "mfl.setup.jobTitles.wrapper",
        "mfl.setup.contacts.wrapper",
        "mfl.setup.facilityOwners.wrapper"
    ])
    .provider("adminApi", function(){
        this.$get = ["api","constituenciesApi","countiesApi","wardsApi", "townsApi",
        "contactsApi","jobTitlesApi","facilityOwnerTypesApi","facilityOwnersApi",
        function(constituenciesApi, countiesApi, wardsApi, townsApi,
                 contactsApi, jobTitlesApi, facilityOwnersTypesApi, facilityOwnersApi){
            return {
                constituencies: constituenciesApi.api,
                wards: wardsApi.api,
                counties: countiesApi.api,
                towns: townsApi.api,
                contacts: contactsApi.api,
                jobTitles: jobTitlesApi.api,
                facilityOwnerTypes: facilityOwnersTypesApi.api,
                facilityOwners: facilityOwnersApi.api
            };
        }];
    });
})(angular);
