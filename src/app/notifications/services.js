(function (angular) {
    "use strict";

    angular.module("mfl.notifications.services", [
        "api.wrapper"
    ])

    .service("mfl.notifications.services.wrappers", ["api", function (api) {
        this.notifications = api.setBaseUrl("api/common/notifications/");
        this.groups = api.setBaseUrl("api/users/groups/");
    }]);

})(window.angular);
