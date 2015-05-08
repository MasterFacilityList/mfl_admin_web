"use strict";

(function(angular){
    angular.module("mfl.counties.wrapper", ["sil.api.wrapper"])
    .provider("countiesApi", function(){
        var self = this;
        self.baseUrl = "api/common/counties";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);
