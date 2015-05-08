"use strict";

angular.module("mfl.facilities.wrapper", ["sil.api.wrapper"])

    .provider("ownersApi", function(){
        var self = this;
        self.baseUrl = "api/facilities/owners/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })
    .provider("facilitiesApi", function () {
        var self = this;
        self.baseUrl = "api/facilities/facilities/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
