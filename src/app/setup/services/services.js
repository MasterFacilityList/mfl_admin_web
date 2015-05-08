"use strict";

(function(angular){
    angular.module("mfl.setup.api", [
        "mfl.setup.constituencies.wrapper",
        "mfl.setup.counties.wrapper",
        "mfl.setup.towns.wrapper",
        "mfl.setup.wards.wrapper",
        "mfl.setup.contacts.wrapper",
        "mfl.setup.facilities.wrapper"
    ])
    .provider("adminApi", function(){
        this.$get = ["api","constituenciesApi","countiesApi","wardsApi", "townsApi",
        "contactsApi","facilityJobTitlesApi","facilityOwnerTypesApi","facilityOwnersApi",
        "facilityRegulatoryBodiesApi",
        function(constituenciesApi, countiesApi, wardsApi, townsApi,
                 contactsApi, facilityJobTitlesApi, facilityOwnersTypesApi, facilityOwnersApi,
                 facilityRegulatoryBodiesApi){
            return {
                constituencies: constituenciesApi.api,
                wards: wardsApi.api,
                counties: countiesApi.api,
                towns: townsApi.api,
                contacts: contactsApi.api,
                facilityJobTitles: facilityJobTitlesApi.api,
                facilityOwnerTypes: facilityOwnersTypesApi.api,
                facilityOwners: facilityOwnersApi.api,
                facilityRegulatoryBodies: facilityRegulatoryBodiesApi.api
            };
        }];
    });
})(angular);
