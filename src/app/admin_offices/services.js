(function (angular) {
    "use strict";

    angular.module("mfl.admin_offices.services", [
        "api.wrapper"
    ])

    .service("mfl.admin_offices.services.wrappers", ["api", function (api) {
        this.admin_offices = api.setBaseUrl("api/admin_offices/");
        this.filter_summaries = api.setBaseUrl("api/common/filtering_summaries/");
    }]);

})(window.angular);
