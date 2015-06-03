(function (angular) {
    "use strict";

    angular.module("mfl.users.services", ["sil.api.wrapper"])

    .service("mfl.users.wrappers", ["api", function (api) {
        this.groups = api.setBaseUrl("api/users/groups/");
        this.permissions = api.setBaseUrl("api/users/permissions/");
        this.users = api.setBaseUrl("api/users/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.user_contacts = api.setBaseUrl("api/common/user_contacts/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
    }]);

})(angular);
