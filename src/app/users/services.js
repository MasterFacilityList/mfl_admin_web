(function (angular) {
    "use strict";

    angular.module("mfl.users.services", ["sil.api.wrapper"])

    .service("mfl.users.services.wrappers", ["api", function (api) {
        this.groups = api.setBaseUrl("api/users/groups/");
        this.permissions = api.setBaseUrl("api/users/permissions/");
        this.users = api.setBaseUrl("api/users/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.user_contacts = api.setBaseUrl("api/common/user_contacts/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
    }])

    .service("mfl.users.services.profile", ["api", function (API) {
        var urls = {
            user_profile: "api/rest-auth/user/",
            password_change: "api/rest-auth/password/change/"
        };
        var api = API.getApi();

        var getProfile = function () {
            return api.callApi("GET", api.makeUrl(urls.user_profile));
        };
        var updateProfile = function (data) {
            return api.callApi("PATCH", api.makeUrl(urls.user_profile), data);
        };
        var updatePassword = function (pwd1, pwd2) {
            return api.callApi("POST", api.makeUrl(urls.password_change), {
                "new_password1": pwd1,
                "new_password2": pwd2
            });
        };

        return {
            "getProfile": getProfile,
            "updateProfile": updateProfile,
            "updatePassword": updatePassword
        };
    }]);

})(angular);
