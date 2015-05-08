"use strict";

(function(angular){
    angular.module("mfl.setup.wards.wrapper", ["sil.api.wrapper"])
    .provider("wardsApi", function(){
        var self = this;
        self.baseUrl = "api/common/wards";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);
