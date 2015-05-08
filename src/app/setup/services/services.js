"use strict";

(function(angular){
    angular.module("mfl.setup.api", [
        "mfl.setup.constituencies.wrapper",
        "mfl.setup.counties.wrapper",
        "mfl.setup.towns.wrapper",
        "mfl.setup.wards.wrapper"
    ])
    .provider("adminApi", function(){
        this.$get = ["api","constituenciesApi","countiesApi","wardsApi", "townsApi",
        "contactsApi",
        function(constituenciesApi, countiesApi, wardsApi, townsApi,
                 contactsApi){
            return {
                constituencies: constituenciesApi.api,
                wards: wardsApi.api,
                counties: countiesApi.api,
                towns: townsApi.api,
                contacts: contactsApi.api
            };
        }];
    });
})(angular);
