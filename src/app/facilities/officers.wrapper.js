"use strict";

(function(angular){
    angular.module("mfl.officers.wrapper", ["sil.api.wrapper"])
    .provider("officersApi", function(){
        var self = this;
        self.baseUrl = "api/facilities/officers";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);