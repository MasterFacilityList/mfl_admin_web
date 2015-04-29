"use strict";

(function(angular){
    angular.module("mfl.practitioners.wrapper", ["sil.api.wrapper"])
    .provider("practitionersApi", function(){
        var self = this;
        self.baseUrl = "api/facilities/practitioners";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);