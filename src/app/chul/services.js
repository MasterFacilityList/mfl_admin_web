(function (angular) {
    "use strict";

    angular.module("mfl.chul.services", [
        "api.wrapper"
    ])

    .service("mfl.chul.services.wrappers", ["api", function (api) {
        this.chuls = api.setBaseUrl("api/chul/units/");
    }]);

})(window.angular, window._);
