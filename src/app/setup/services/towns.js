"use strict";

(function(angular){
    angular.module("mfl.setup.towns.wrapper", ["sil.api.wrapper"])
    .provider("townsApi", function(){
        var self = this;
        self.baseUrl = "api/common/towns";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);
