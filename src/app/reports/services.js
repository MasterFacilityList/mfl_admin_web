(function(angular){
    "use strict";

    angular.module("mfl.reports.services", [
        "api.wrapper"
    ])

    .service("mfl.reports.services.wrappers",
        ["api", function(api) {
            this.filters = api.setBaseUrl("api/common/filtering_summaries/");
            this.facilities = api.setBaseUrl("api/facilities/facilities/");
            this.helpers = api.apiHelpers;
        }]
    );

})(window.angular);
