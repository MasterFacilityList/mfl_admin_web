"use strict";

(function(angular){
    angular.module("mfl.setup.jobTitles.wrapper", ["sil.api.wrapper"])
    .provider("jobTitlesApi", function(){
        var self = this;
        self.baseUrl = "api/facilities/job_titles";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });
})(angular);
