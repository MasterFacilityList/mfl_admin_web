(function (angular) {
    "use strict";

    angular.module("mfl.dashboard.wrapper", ["sil.api.wrapper"])

    .provider("dashboardApi", function () {
        var self = this;
        self.baseUrl = "api/facilities/dashboard/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    });

})(angular);
