"use strict";

(function(angular){
    angular.module("mfl.setup.chu.wrapper", ["sil.api.wrapper"])
    .provider("chuStatusApi", function(){
        var self = this;
        self.baseUrl = "api/chul/statuses/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })

    .provider("chuApproversApi", function(){
        var self = this;
        self.baseUrl = "api/chul/approvers/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);
