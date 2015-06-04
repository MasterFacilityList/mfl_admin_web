(function (angular) {
    "use strict";

    angular.module("mfl.facilities.services", [
        "sil.api.wrapper"
    ])

    .service("mfl.facilities.wrappers", ["api", function (api) {
        this.facilities = api.setBaseUrl("api/facilities/facilities/");
        this.filterOptions = api.setBaseUrl("api/common/filtering_summaries/");
        this.constituencies = api.setBaseUrl("api/common/constituencies");
    }]);

})(angular);
