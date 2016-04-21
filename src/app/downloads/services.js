(function (angular) {
    "use strict";

    angular.module("mfl.download.services", [
        "api.wrapper"
    ])

    .service("mfl.download.services.wrappers", ["api", function (api) {
        this.documents = api.setBaseUrl("api/common/documents/");
    }]);

})(window.angular);
