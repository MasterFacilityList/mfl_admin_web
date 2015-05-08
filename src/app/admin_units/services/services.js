"use strict";

(function(angular){
    angular.module("mfl.admin_units.api", [
        "mfl.constituencies.wrapper",
        "mfl.counties.wrapper",
        "mfl.towns.wrapper",
        "mfl.wards.wrapper"
    ])
    .provider("adminApi", function(){
        this.$get = ["api","constituenciesApi","countiesApi","wardsApi", "townsApi",
        function(constituenciesApi, countiesApi, wardsApi, townsApi){
            return {
                constituencies: constituenciesApi.api,
                wards: wardsApi.api,
                counties: countiesApi.api,
                towns: townsApi.api
            };
        }];
    });
})(angular);
