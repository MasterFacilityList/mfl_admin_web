"use strict";

(function(angular){
    angular.module("mfl.constituencies.wrapper", ["sil.api.wrapper"])
    .provider("constituenciesApi", function(){
        var self = this;
        self.baseUrl = "api/common/constituencies";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);
